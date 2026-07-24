const DEFAULT_CATEGORIES = ['history', 'cache', 'cookies', 'storage'];

let currentDomain = null;
let whitelist = [];

function t(key) {
  return chrome.i18n.getMessage(key) || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const msg = t(el.dataset.i18n);
    if (msg) el.textContent = msg;
  });
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function isDomainProtected(domain) {
  return whitelist.includes(domain);
}

async function loadWhitelist() {
  const data = await chrome.storage.sync.get('whitelist');
  whitelist = data.whitelist || [];
}

async function saveWhitelist() {
  await chrome.storage.sync.set({ whitelist });
}

async function loadCategories() {
  const data = await chrome.storage.sync.get('selectedCategories');
  const saved = data.selectedCategories || DEFAULT_CATEGORIES;
  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.checked = saved.includes(cb.value);
  });
}

async function saveCategories() {
  const selected = Array.from(document.querySelectorAll('input[name="cat"]:checked')).map(cb => cb.value);
  await chrome.storage.sync.set({ selectedCategories: selected });
}

function renderShield() {
  const shieldBtn   = document.getElementById('shield-btn');
  const shieldLabel = document.getElementById('shield-label');
  const badge       = document.getElementById('wl-count-badge');

  badge.textContent = whitelist.length;

  if (!currentDomain) return;

  const isProtected = isDomainProtected(currentDomain);
  shieldBtn.classList.toggle('active', isProtected);
  shieldLabel.textContent = isProtected ? t('protected') : t('protect');
}

async function toggleProtection() {
  if (!currentDomain) return;

  const idx = whitelist.indexOf(currentDomain);
  if (idx === -1) whitelist.push(currentDomain);
  else whitelist.splice(idx, 1);

  await saveWhitelist();
  renderShield();
}

function getSelectedCategories() {
  return Array.from(document.querySelectorAll('input[name="cat"]:checked')).map(cb => cb.value);
}

function formatStats(stats) {
  const parts = [];
  if (stats.cookies > 0) parts.push(`${stats.cookies.toLocaleString()} cookies`);
  if (stats.urls > 0)    parts.push(`${stats.urls.toLocaleString()} URLs`);
  if (stats.cache)       parts.push('cache cleared');
  if (stats.storage)     parts.push('storage cleared');
  if (stats.forms)       parts.push('forms cleared');
  return parts.length ? parts.join(' · ') : 'nothing to clean';
}

// Wraps a single browsingData.remove call — a deprecated/unsupported type
// won't silently kill other types
async function safeRemove(options, dataType) {
  try {
    await chrome.browsingData.remove(options, dataType);
    return true;
  } catch {
    return false;
  }
}

// ── Cleaners ──
// Whitelist only protects COOKIES. History, cache, storage are wiped for all sites.

async function cleanHistory() {
  // Always delete all — whitelist doesn't apply here
  await chrome.history.deleteAll();
}

async function cleanCache() {
  // Each type in its own call — deprecated types (appcache) won't block the others
  await Promise.allSettled([
    safeRemove({ since: 0 }, { cache: true }),
    safeRemove({ since: 0 }, { cacheStorage: true }),
    safeRemove({ since: 0 }, { serviceWorkers: true }),
  ]);
}

async function cleanCookies() {
  // Whitelist applies here only — keep cookies from protected domains
  const cookies = await chrome.cookies.getAll({});
  const toDelete = cookies.filter(cookie => {
    const domain = cookie.domain.replace(/^\./, '');
    return !whitelist.some(w => domain === w || domain.endsWith('.' + w));
  });

  await Promise.allSettled(toDelete.map(cookie => {
    const protocol = cookie.secure ? 'https' : 'http';
    const host = cookie.domain.replace(/^\./, '');
    return chrome.cookies.remove({
      url: `${protocol}://${host}${cookie.path}`,
      name: cookie.name,
      storeId: cookie.storeId
    });
  }));

  return toDelete.length;
}

async function cleanStorage() {
  // All sites — whitelist doesn't apply here
  await Promise.allSettled([
    safeRemove({ since: 0 }, { localStorage: true }),
    safeRemove({ since: 0 }, { indexedDB: true }),
  ]);
}

async function cleanForms() {
  await Promise.allSettled([
    safeRemove({ since: 0 }, { formData: true }),
    safeRemove({ since: 0 }, { passwords: true }),
  ]);
}

// ── Main ──

async function cleanAll() {
  const categories = getSelectedCategories();
  if (categories.length === 0) return;

  const cleanBtn     = document.getElementById('clean-btn');
  const statusEl     = document.getElementById('status');
  const originalHTML = cleanBtn.innerHTML;

  cleanBtn.disabled = true;
  cleanBtn.innerHTML = `<span style="opacity:.7">${t('cleaning')}</span>`;
  statusEl.className = 'status hidden';

  const stats = { cookies: 0, urls: 0, cache: false, storage: false, forms: false };

  try {
    const tasks = [];

    if (categories.includes('history')) {
      tasks.push(
        cleanHistory(),
        safeRemove({ since: 0 }, { downloads: true })
      );
    }
    if (categories.includes('cache')) {
      tasks.push(cleanCache().then(() => { stats.cache = true; }));
    }
    if (categories.includes('cookies')) {
      tasks.push(cleanCookies().then(n => { stats.cookies += n; }));
    }
    if (categories.includes('storage')) {
      tasks.push(cleanStorage().then(() => { stats.storage = true; }));
    }
    if (categories.includes('forms')) {
      tasks.push(cleanForms().then(() => { stats.forms = true; }));
    }

    await Promise.allSettled(tasks);

    statusEl.textContent = `✓ ${formatStats(stats)}`;
    statusEl.className = 'status success';
  } catch (err) {
    console.error(err);
    statusEl.textContent = `✗ ${t('status_error')}`;
    statusEl.className = 'status error';
  } finally {
    cleanBtn.disabled = false;
    cleanBtn.innerHTML = originalHTML;
  }
}

async function init() {
  applyI18n();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentDomain = tab?.url ? extractDomain(tab.url) : null;

  const domainEl  = document.getElementById('current-domain');
  const shieldBtn = document.getElementById('shield-btn');

  if (currentDomain && !currentDomain.startsWith('chrome')) {
    domainEl.textContent = currentDomain;
  } else {
    domainEl.textContent = t('not_a_web_page');
    shieldBtn.disabled = true;
    currentDomain = null;
  }

  await Promise.all([loadWhitelist(), loadCategories()]);
  renderShield();

  shieldBtn.addEventListener('click', toggleProtection);
  document.getElementById('clean-btn').addEventListener('click', cleanAll);
  document.getElementById('settings-btn').addEventListener('click', () => chrome.runtime.openOptionsPage());

  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.addEventListener('change', saveCategories);
  });
}

document.addEventListener('DOMContentLoaded', init);
