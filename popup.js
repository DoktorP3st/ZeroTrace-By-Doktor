const DEFAULT_CATEGORIES = ['history', 'cache', 'cookies', 'storage'];

let currentDomain = null;
let whitelist = [];

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

async function safeRemove(options, dataType) {
  try {
    await chrome.browsingData.remove(options, dataType);
    return true;
  } catch {
    return false;
  }
}

async function cleanHistory() {
  try { await chrome.history.deleteAll(); } catch {}
}

async function cleanCache() {
  for (const type of ['cache', 'cacheStorage', 'serviceWorkers']) {
    try { await chrome.browsingData.remove({ since: 0 }, { [type]: true }); } catch {}
  }
}

function cookieKey(c) {
  return `${c.name}|${c.domain}|${c.path}|${c.storeId}|${c.partitionKey?.topLevelSite ?? ''}`;
}

async function cleanCookies() {
  const unpartitioned = await chrome.cookies.getAll({});
  let partitioned = [];
  try { partitioned = await chrome.cookies.getAll({ partitionKey: {} }); } catch {}

  const seen = new Set();
  const allVisible = [];
  for (const c of [...unpartitioned, ...partitioned]) {
    const k = cookieKey(c);
    if (!seen.has(k)) { seen.add(k); allVisible.push(c); }
  }

  const toKeep = allVisible.filter(cookie => {
    const domain = cookie.domain.replace(/^\./, '');
    return whitelist.some(w => domain === w || domain.endsWith('.' + w));
  });

  try {
    await chrome.browsingData.remove({ since: 0 }, { cookies: true });
  } catch {
    return 0;
  }

  for (const cookie of toKeep) {
    const protocol = cookie.secure ? 'https' : 'http';
    const host = cookie.domain.replace(/^\./, '');
    const details = {
      url: `${protocol}://${host}${cookie.path}`,
      name: cookie.name,
      value: cookie.value,
      path: cookie.path,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite || 'unspecified',
      storeId: cookie.storeId,
    };
    if (!cookie.name.startsWith('__Host-')) details.domain = cookie.domain;
    if (cookie.expirationDate) details.expirationDate = cookie.expirationDate;
    if (cookie.partitionKey !== undefined) details.partitionKey = cookie.partitionKey;
    try { await chrome.cookies.set(details); } catch {}
  }

  return allVisible.length - toKeep.length;
}

async function cleanStorage() {
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
  await initI18n();
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
