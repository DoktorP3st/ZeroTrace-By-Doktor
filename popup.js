const DEFAULT_CATEGORIES = ['history', 'downloads', 'cache', 'cookies', 'localStorage', 'indexedDB'];

let currentDomain = null;
let whitelist = [];
let timeRange = 'all';

// ── Utils ──

function extractDomain(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
}

function getTimeSince() {
  const durations = { '1h': 3600000, '24h': 86400000, '7d': 604800000 };
  return timeRange in durations ? Date.now() - durations[timeRange] : 0;
}

function getSelectedCategories() {
  return Array.from(document.querySelectorAll('input[name="cat"]:checked')).map(cb => cb.value);
}

function formatStats(stats) {
  const parts = [];
  if (stats.cookies > 0)  parts.push(`${stats.cookies.toLocaleString()} ${t('stat_cookies')}`);
  if (stats.downloads)    parts.push(t('stat_downloads_cleared'));
  if (stats.cache)        parts.push(t('stat_cache_cleared'));
  if (stats.storage)      parts.push(t('stat_storage_cleared'));
  if (stats.forms)        parts.push(t('stat_forms_cleared'));
  return parts.length ? parts.join(' · ') : t('stat_nothing');
}

// ── Storage ──

async function loadWhitelist() {
  const data = await chrome.storage.sync.get('whitelist');
  whitelist = data.whitelist || [];
}

async function saveWhitelist() {
  await chrome.storage.sync.set({ whitelist });
}

async function loadCategories() {
  const data = await chrome.storage.sync.get('selectedCategories');
  let saved = data.selectedCategories || DEFAULT_CATEGORIES;

  // Migration: old 'storage' key → localStorage + indexedDB
  if (saved.includes('storage')) {
    saved = [...saved.filter(c => c !== 'storage'), 'localStorage', 'indexedDB'];
  }
  // Migration: 'history' used to silently clean downloads too
  if (saved.includes('history') && !saved.includes('downloads')) {
    saved = [...saved, 'downloads'];
  }

  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.checked = saved.includes(cb.value);
  });
}

async function saveCategories() {
  const selected = getSelectedCategories();
  await chrome.storage.sync.set({ selectedCategories: selected });
}

async function loadTimeRange() {
  const data = await chrome.storage.sync.get('timeRange');
  timeRange = data.timeRange || 'all';
  document.getElementById('time-range').value = timeRange;
}

// ── Shield ──

function renderShield() {
  const shieldBtn   = document.getElementById('shield-btn');
  const shieldLabel = document.getElementById('shield-label');
  const badge       = document.getElementById('wl-count-badge');

  badge.textContent = whitelist.length;
  if (!currentDomain) return;

  const isProtected = whitelist.includes(currentDomain);
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

// ── Clean functions ──

async function safeRemove(options, dataType) {
  try { await chrome.browsingData.remove(options, dataType); return true; } catch { return false; }
}

async function cleanHistory(since) {
  if (since === 0) {
    try { await chrome.history.deleteAll(); } catch {}
  } else {
    try { await chrome.browsingData.remove({ since }, { history: true }); } catch {}
  }
}

async function cleanDownloads(since) {
  await safeRemove({ since }, { downloads: true });
}

async function cleanCache(since) {
  for (const type of ['cache', 'cacheStorage', 'serviceWorkers']) {
    try { await chrome.browsingData.remove({ since }, { [type]: true }); } catch {}
  }
}

async function cleanCookies() {
  const { total, kept } = await cleanCookiesKeeping(cookie => isWhitelisted(cookie.domain, whitelist));
  return total - kept;
}

async function cleanLocalStorage(since, wl = []) {
  const excluded = wl.flatMap(w => [`https://${w}`, `http://${w}`]);
  const opts = { since };
  if (excluded.length) opts.excludedOrigins = excluded;
  await safeRemove(opts, { localStorage: true });
}

async function cleanIndexedDB(since, wl = []) {
  const excluded = wl.flatMap(w => [`https://${w}`, `http://${w}`]);
  const opts = { since };
  if (excluded.length) opts.excludedOrigins = excluded;
  await safeRemove(opts, { indexedDB: true });
}

async function cleanForms(since) {
  await Promise.allSettled([
    safeRemove({ since }, { formData: true }),
    safeRemove({ since }, { passwords: true }),
  ]);
}

// ── Core clean logic (no UI) ──

async function runClean() {
  const categories = getSelectedCategories();
  if (categories.length === 0) return null;

  const since = getTimeSince();
  const stats = { cookies: 0, downloads: false, cache: false, storage: false, forms: false };
  const tasks = [];

  if (categories.includes('history'))      tasks.push(cleanHistory(since));
  if (categories.includes('downloads'))    tasks.push(cleanDownloads(since).then(() => { stats.downloads = true; }));
  if (categories.includes('cache'))        tasks.push(cleanCache(since).then(() => { stats.cache = true; }));
  if (categories.includes('cookies'))      tasks.push(cleanCookies().then(n => { stats.cookies += n; }));
  if (categories.includes('localStorage')) tasks.push(cleanLocalStorage(since, whitelist).then(() => { stats.storage = true; }));
  if (categories.includes('indexedDB'))    tasks.push(cleanIndexedDB(since, whitelist).then(() => { stats.storage = true; }));
  if (categories.includes('forms'))        tasks.push(cleanForms(since).then(() => { stats.forms = true; }));

  await Promise.allSettled(tasks);
  return stats;
}

// ── Clean All (with UI) ──

async function cleanAll() {
  const cleanBtn     = document.getElementById('clean-btn');
  const statusEl     = document.getElementById('status');
  const originalHTML = cleanBtn.innerHTML;

  cleanBtn.disabled = true;
  cleanBtn.innerHTML = `<span style="opacity:.7">${t('cleaning')}</span>`;
  statusEl.className = 'status hidden';

  try {
    const stats = await runClean();
    if (!stats) return;
    statusEl.textContent = `✓ ${formatStats(stats)}`;
    statusEl.className = 'status success';
  } catch {
    statusEl.textContent = `✗ ${t('status_error')}`;
    statusEl.className = 'status error';
  } finally {
    cleanBtn.disabled = false;
    cleanBtn.innerHTML = originalHTML;
  }
}

// ── Secure close ──

async function secureClose() {
  const secBtn   = document.getElementById('secure-close-btn');
  const cleanBtn = document.getElementById('clean-btn');
  secBtn.disabled   = true;
  cleanBtn.disabled = true;

  try {
    await runClean();
    const wins = await chrome.windows.getAll();
    for (const w of wins) {
      try { await chrome.windows.remove(w.id); } catch {}
    }
  } catch {
    secBtn.disabled   = false;
    cleanBtn.disabled = false;
  }
}

// ── Incognito ──

async function openIncognito() {
  try {
    await chrome.windows.create({ incognito: true });
    window.close();
  } catch {}
}

// ── Init ──

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

  await Promise.all([loadWhitelist(), loadCategories(), loadTimeRange()]);
  renderShield();

  shieldBtn.addEventListener('click', toggleProtection);
  document.getElementById('clean-btn').addEventListener('click', cleanAll);
  document.getElementById('secure-close-btn').addEventListener('click', secureClose);
  document.getElementById('incognito-btn').addEventListener('click', openIncognito);
  document.getElementById('settings-btn').addEventListener('click', () => chrome.runtime.openOptionsPage());

  document.getElementById('time-range').addEventListener('change', async e => {
    timeRange = e.target.value;
    await chrome.storage.sync.set({ timeRange });
  });

  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.addEventListener('change', saveCategories);
  });
}

document.addEventListener('DOMContentLoaded', init);
