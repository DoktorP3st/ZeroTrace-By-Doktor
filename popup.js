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

function isUrlProtected(url) {
  try {
    const domain = extractDomain(url);
    return whitelist.some(w => domain === w || domain.endsWith('.' + w));
  } catch {
    return false;
  }
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

// ── Cleaners ──

async function cleanCookies() {
  const cookies = await chrome.cookies.getAll({});
  const toDelete = cookies.filter(cookie => {
    const domain = cookie.domain.replace(/^\./, '');
    return !whitelist.some(w => domain === w || domain.endsWith('.' + w));
  });
  await Promise.allSettled(toDelete.map(cookie => {
    const protocol = cookie.secure ? 'https' : 'http';
    const host = cookie.domain.replace(/^\./, '');
    return chrome.cookies.remove({ url: `${protocol}://${host}${cookie.path}`, name: cookie.name, storeId: cookie.storeId });
  }));
  return toDelete.length;
}

async function cleanHistory() {
  if (whitelist.length === 0) {
    await chrome.history.deleteAll();
    return 0;
  }
  // maxResults: 0 = no limit
  const items = await chrome.history.search({ text: '', maxResults: 0, startTime: 0 });
  const toDelete = items.filter(item => {
    try { return !isUrlProtected(item.url); } catch { return true; }
  });
  await Promise.allSettled(toDelete.map(item => chrome.history.deleteUrl({ url: item.url })));
  return toDelete.length;
}

async function cleanWithExclusions(dataTypes) {
  const excludedOrigins = whitelist.flatMap(domain => [
    `https://${domain}`, `http://${domain}`,
    `https://www.${domain}`, `http://www.${domain}`
  ]);
  await chrome.browsingData.remove({ since: 0, excludedOrigins }, dataTypes);
}

// ── Main ──

async function cleanAll() {
  const categories = getSelectedCategories();
  if (categories.length === 0) return;

  const cleanBtn   = document.getElementById('clean-btn');
  const statusEl   = document.getElementById('status');
  const originalHTML = cleanBtn.innerHTML;

  cleanBtn.disabled = true;
  cleanBtn.innerHTML = `<span style="opacity:.7">${t('cleaning')}</span>`;
  statusEl.className = 'status hidden';

  const stats = { cookies: 0, urls: 0, cache: false, storage: false, forms: false };

  try {
    const tasks = [];

    if (categories.includes('history')) {
      tasks.push(cleanHistory().then(n => { if (n) stats.urls += n; }));
      tasks.push(chrome.browsingData.remove({ since: 0 }, { downloads: true }));
    }
    if (categories.includes('cache')) {
      tasks.push(cleanWithExclusions({
        cache: true, cacheStorage: true, appcache: true, serviceWorkers: true
      }).then(() => { stats.cache = true; }));
    }
    if (categories.includes('cookies')) {
      tasks.push(cleanCookies().then(n => { stats.cookies += n; }));
    }
    if (categories.includes('storage')) {
      tasks.push(cleanWithExclusions({
        localStorage: true, indexedDB: true, webSQL: true, fileSystems: true
      }).then(() => { stats.storage = true; }));
    }
    if (categories.includes('forms')) {
      tasks.push(chrome.browsingData.remove({ since: 0 }, {
        formData: true, passwords: true
      }).then(() => { stats.forms = true; }));
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
