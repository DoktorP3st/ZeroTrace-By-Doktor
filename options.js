const EXPORT_KEYS = ['whitelist', 'selectedCategories', 'autoCleanOnStartup', 'uiLang'];

let whitelist = [];
let autoCleanOnStartup = false;
let cookieDomains = [];

async function loadSettings() {
  const data = await chrome.storage.sync.get(EXPORT_KEYS);
  whitelist = data.whitelist || [];
  autoCleanOnStartup = data.autoCleanOnStartup || false;
}

function renderToggle() {
  document.getElementById('auto-clean-toggle').classList.toggle('active', autoCleanOnStartup);
}

async function toggleAutoClean() {
  autoCleanOnStartup = !autoCleanOnStartup;
  await chrome.storage.sync.set({ autoCleanOnStartup });
  renderToggle();
}

async function saveWhitelist() {
  await chrome.storage.sync.set({ whitelist });
}

function isValidDomain(str) {
  return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(str.trim());
}

function render() {
  const listEl   = document.getElementById('site-list');
  const emptyEl  = document.getElementById('empty-state');
  const dangerEl = document.getElementById('danger-section');
  const totalEl  = document.getElementById('total-count');

  totalEl.textContent = `${whitelist.length} site${whitelist.length !== 1 ? 's' : ''}`;
  listEl.innerHTML = '';

  if (whitelist.length === 0) {
    emptyEl.style.display = 'flex';
    dangerEl.classList.add('hidden');
  } else {
    emptyEl.style.display = 'none';
    dangerEl.classList.remove('hidden');

    [...whitelist].sort().forEach(domain => {
      const li = document.createElement('li');
      li.className = 'site-item';
      li.innerHTML = `
        <span class="site-shield">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </span>
        <span class="site-domain" title="${domain}">${domain}</span>
        <button class="site-remove" data-domain="${domain}">${t('remove')}</button>
      `;
      listEl.appendChild(li);
    });
  }

  // Refresh protected badges in cookie viewer (no API call, instant)
  const searchEl = document.getElementById('cookie-search');
  if (searchEl) renderCookies(searchEl.value);
}

// ── Cookie viewer ──

async function loadCookieDomains() {
  const unpartitioned = await chrome.cookies.getAll({});
  let partitioned = [];
  try { partitioned = await chrome.cookies.getAll({ partitionKey: {} }); } catch {}

  const seen = new Set();
  const all = [];
  for (const c of [...unpartitioned, ...partitioned]) {
    const k = `${c.name}|${c.domain}|${c.path}|${c.storeId}|${c.partitionKey?.topLevelSite ?? ''}`;
    if (!seen.has(k)) { seen.add(k); all.push(c); }
  }

  const map = new Map();
  for (const c of all) {
    const d = c.domain.replace(/^\./, '');
    if (!map.has(d)) map.set(d, { domain: d, count: 0, cookies: [] });
    const entry = map.get(d);
    entry.count++;
    entry.cookies.push(c);
  }

  cookieDomains = [...map.values()].sort((a, b) => a.domain.localeCompare(b.domain));
}

function renderCookies(filter = '') {
  const listEl    = document.getElementById('cookie-list');
  const emptyEl   = document.getElementById('cookie-empty');
  const summaryEl = document.getElementById('cookies-summary');
  if (!listEl) return;

  const term     = filter.toLowerCase().trim();
  const filtered = term ? cookieDomains.filter(d => d.domain.includes(term)) : cookieDomains;

  const totalCookies = filtered.reduce((s, d) => s + d.count, 0);
  summaryEl.textContent = `${filtered.length} domains · ${totalCookies} cookies`;

  listEl.querySelectorAll('.cookie-row').forEach(el => el.remove());

  if (filtered.length === 0) {
    emptyEl.style.display = '';
    return;
  }
  emptyEl.style.display = 'none';

  for (const entry of filtered) {
    const isProtected = whitelist.includes(entry.domain);
    const row = document.createElement('div');
    row.className = 'cookie-row';
    row.innerHTML = `
      <span class="cookie-domain" title="${entry.domain}">${entry.domain}</span>
      <span class="cookie-count-badge">${entry.count}</span>
      <button class="cookie-protect-btn ${isProtected ? 'active' : ''}" data-domain="${entry.domain}">
        ${isProtected ? t('protected') : t('protect')}
      </button>
      <button class="cookie-del-btn" data-domain="${entry.domain}" title="${t('delete_domain')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
      </button>
    `;
    listEl.appendChild(row);
  }
}

async function cookieProtectToggle(domain) {
  if (whitelist.includes(domain)) {
    whitelist = whitelist.filter(d => d !== domain);
  } else {
    whitelist.push(domain);
  }
  await saveWhitelist();
  render();
}

async function deleteDomainCookies(domain) {
  const entry = cookieDomains.find(d => d.domain === domain);
  if (!entry) return;

  for (const cookie of entry.cookies) {
    const protocol = cookie.secure ? 'https' : 'http';
    const host = cookie.domain.replace(/^\./, '');
    try {
      await chrome.cookies.remove({
        url: `${protocol}://${host}${cookie.path}`,
        name: cookie.name,
        storeId: cookie.storeId,
      });
    } catch {}
  }

  cookieDomains = cookieDomains.filter(d => d.domain !== domain);
  const searchEl = document.getElementById('cookie-search');
  renderCookies(searchEl ? searchEl.value : '');
}

async function addDomain() {
  const input   = document.getElementById('add-input');
  const errorEl = document.getElementById('add-error');
  const raw = input.value.trim().toLowerCase()
    .replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

  errorEl.className = 'add-error hidden';
  if (!raw) return;

  if (!isValidDomain(raw)) {
    errorEl.textContent = `"${raw}" — ${t('import_failed')}`;
    errorEl.className = 'add-error';
    return;
  }
  if (whitelist.includes(raw)) {
    errorEl.textContent = `${raw} is already protected`;
    errorEl.className = 'add-error';
    return;
  }

  whitelist.push(raw);
  await saveWhitelist();
  input.value = '';
  render();
}

async function removeDomain(domain) {
  whitelist = whitelist.filter(d => d !== domain);
  await saveWhitelist();
  render();
}

async function clearAll() {
  if (!confirm(t('confirm_clear_all'))) return;
  whitelist = [];
  await saveWhitelist();
  render();
}

async function changeLang() {
  const lang = document.getElementById('lang-select').value;
  await chrome.storage.sync.set({ uiLang: lang });
  await initI18n();
  applyI18n();
  render();
}

// ── Export ──
async function exportSettings() {
  const data = await chrome.storage.sync.get(EXPORT_KEYS);
  const payload = {
    version: chrome.runtime.getManifest().version,
    exportedAt: new Date().toISOString(),
    settings: {
      whitelist:          data.whitelist          || [],
      selectedCategories: data.selectedCategories || ['history', 'cache', 'cookies', 'storage'],
      autoCleanOnStartup:   data.autoCleanOnStartup   || false,
      uiLang:             data.uiLang             || 'auto'
    }
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `zerotrace-settings-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Import ──
async function importSettings(file) {
  const statusEl = document.getElementById('io-status');
  statusEl.className = 'io-status hidden';

  try {
    const text   = await file.text();
    const parsed = JSON.parse(text);

    if (!parsed.settings || typeof parsed.settings !== 'object') throw new Error('Invalid file format');

    const s = parsed.settings;
    const toSave = {};

    if (Array.isArray(s.whitelist)) {
      toSave.whitelist = [...new Set(s.whitelist.filter(d => typeof d === 'string' && isValidDomain(d)))];
    }
    if (Array.isArray(s.selectedCategories)) {
      const allowed = ['history', 'cache', 'cookies', 'storage', 'forms'];
      toSave.selectedCategories = s.selectedCategories.filter(c => allowed.includes(c));
    }
    if (typeof s.autoCleanOnStartup === 'boolean') {
      toSave.autoCleanOnStartup = s.autoCleanOnStartup;
    }
    if (typeof s.uiLang === 'string') {
      const validLangs = ['auto', 'en', 'fr', 'es', 'pt_PT', 'de', 'it', 'ja'];
      if (validLangs.includes(s.uiLang)) toSave.uiLang = s.uiLang;
    }

    await chrome.storage.sync.set(toSave);
    await loadSettings();
    await initI18n();
    applyI18n();
    render();
    renderToggle();
    if (toSave.uiLang) document.getElementById('lang-select').value = toSave.uiLang;

    statusEl.textContent = `✓ ${t('status_imported')}`;
    statusEl.className = 'io-status success';
  } catch (err) {
    statusEl.textContent = `✗ ${t('import_failed')} — ${err.message}`;
    statusEl.className = 'io-status error';
  }

  setTimeout(() => { statusEl.className = 'io-status hidden'; }, 3000);
}

async function init() {
  await initI18n();
  applyI18n();

  const { version } = chrome.runtime.getManifest();
  document.getElementById('app-version').textContent = `v${version}`;

  await loadSettings();
  render();
  renderToggle();

  const { uiLang = 'auto' } = await chrome.storage.sync.get('uiLang');
  document.getElementById('lang-select').value = uiLang;

  document.getElementById('add-btn').addEventListener('click', addDomain);
  document.getElementById('add-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addDomain();
  });
  document.getElementById('site-list').addEventListener('click', async e => {
    const btn = e.target.closest('.site-remove');
    if (btn) await removeDomain(btn.dataset.domain);
  });
  document.getElementById('clear-all-btn').addEventListener('click', clearAll);
  document.getElementById('auto-clean-toggle').addEventListener('click', toggleAutoClean);
  document.getElementById('lang-select').addEventListener('change', changeLang);
  document.getElementById('export-btn').addEventListener('click', exportSettings);
  document.getElementById('import-input').addEventListener('change', e => {
    if (e.target.files[0]) importSettings(e.target.files[0]);
    e.target.value = '';
  });

  await loadCookieDomains();
  renderCookies();

  document.getElementById('cookies-refresh-btn').addEventListener('click', async () => {
    await loadCookieDomains();
    renderCookies(document.getElementById('cookie-search').value);
  });

  document.getElementById('cookie-search').addEventListener('input', e => {
    renderCookies(e.target.value);
  });

  document.getElementById('cookie-list').addEventListener('click', async e => {
    const protectBtn = e.target.closest('.cookie-protect-btn');
    if (protectBtn) { await cookieProtectToggle(protectBtn.dataset.domain); return; }
    const delBtn = e.target.closest('.cookie-del-btn');
    if (delBtn) await deleteDomainCookies(delBtn.dataset.domain);
  });
}

document.addEventListener('DOMContentLoaded', init);
