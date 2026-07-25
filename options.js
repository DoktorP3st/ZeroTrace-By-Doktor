const EXPORT_KEYS = ['whitelist', 'selectedCategories', 'autoCleanOnStartup', 'uiLang'];

let whitelist = [];
let autoCleanOnStartup = false;
let cookieDomains = [];
let activeTab = 'settings';

// ── Tab system ──

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tab}`);
  });
  if (tab === 'cookies') {
    renderCookieColumns(document.getElementById('cookie-search').value);
  }
}

// ── Settings ──

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

// ── Whitelist tab ──

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

  if (activeTab === 'cookies') {
    const searchEl = document.getElementById('cookie-search');
    renderCookieColumns(searchEl ? searchEl.value : '');
  }
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

// ── Cookie columns ──

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
    if (!map.has(d)) map.set(d, { domain: d, count: 0 });
    map.get(d).count++;
  }

  cookieDomains = [...map.values()].sort((a, b) => a.domain.localeCompare(b.domain));
}

function renderCookieColumns(filter = '') {
  const term = filter.toLowerCase().trim();

  const allBody   = document.getElementById('col-all-body');
  const protBody  = document.getElementById('col-protected-body');
  const allEmpty  = document.getElementById('col-all-empty');
  const protEmpty = document.getElementById('col-protected-empty');
  const countAll  = document.getElementById('count-all');
  const countProt = document.getElementById('count-protected');
  const summaryEl = document.getElementById('cookies-summary');

  allBody.querySelectorAll('.col-row').forEach(r => r.remove());
  protBody.querySelectorAll('.col-row').forEach(r => r.remove());

  const cookieMap = new Map(cookieDomains.map(d => [d.domain, d]));

  const notProtected = cookieDomains
    .filter(d => !whitelist.includes(d.domain) && (!term || d.domain.includes(term)))
    .sort((a, b) => a.domain.localeCompare(b.domain));

  const protectedList = whitelist
    .filter(d => !term || d.includes(term))
    .sort((a, b) => a.localeCompare(b))
    .map(d => ({ domain: d, count: cookieMap.get(d)?.count ?? 0 }));

  countAll.textContent  = notProtected.length;
  countProt.textContent = protectedList.length;
  allEmpty.style.display  = notProtected.length  === 0 ? '' : 'none';
  protEmpty.style.display = protectedList.length === 0 ? '' : 'none';

  for (const entry of notProtected) {
    allBody.appendChild(createColRow(entry.domain, entry.count, 'all'));
  }
  for (const entry of protectedList) {
    protBody.appendChild(createColRow(entry.domain, entry.count, 'protected'));
  }

  const totalDomains  = cookieDomains.length;
  const totalCookies  = cookieDomains.reduce((s, d) => s + d.count, 0);
  summaryEl.textContent = `${totalDomains} domaines · ${totalCookies} cookies`;
}

function createColRow(domain, count, col) {
  const toProtect = col === 'all';
  const row = document.createElement('div');
  row.className = 'col-row';
  row.draggable = true;
  row.dataset.domain = domain;

  const arrowSvg = toProtect
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="9 18 15 12 9 6"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="15 18 9 12 15 6"/></svg>`;

  const countHtml = count > 0
    ? `<span class="col-row-count">${count}</span>`
    : '';

  row.innerHTML = `
    <span class="col-row-domain" title="${domain}">${domain}</span>
    ${countHtml}
    <button class="col-row-arrow" title="${toProtect ? 'Protéger' : 'Retirer'}">${arrowSvg}</button>
  `;

  row.querySelector('.col-row-arrow').addEventListener('click', e => {
    e.stopPropagation();
    moveColItem(domain, toProtect);
  });

  row.addEventListener('dragstart', e => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ domain, col }));
    setTimeout(() => row.classList.add('dragging'), 0);
  });
  row.addEventListener('dragend', () => row.classList.remove('dragging'));

  return row;
}

async function moveColItem(domain, toProtect) {
  if (toProtect) {
    if (!whitelist.includes(domain)) whitelist.push(domain);
  } else {
    whitelist = whitelist.filter(d => d !== domain);
  }
  await saveWhitelist();
  render();
}

async function cleanNonProtected() {
  const targets = cookieDomains.filter(d => !whitelist.includes(d.domain));
  if (targets.length === 0) return;

  const n = targets.length;
  if (!confirm(`Supprimer les cookies de ${n} domaine${n > 1 ? 's' : ''} non protégé${n > 1 ? 's' : ''} ?`)) return;

  // Énumérer tous les cookies whitelistés à conserver
  const unpartitioned = await chrome.cookies.getAll({});
  let partitioned = [];
  try { partitioned = await chrome.cookies.getAll({ partitionKey: {} }); } catch {}

  const seen = new Set();
  const toRestore = [];
  for (const c of [...unpartitioned, ...partitioned]) {
    const k = `${c.name}|${c.domain}|${c.path}|${c.storeId}|${c.partitionKey?.topLevelSite ?? ''}`;
    if (!seen.has(k)) {
      seen.add(k);
      if (whitelist.includes(c.domain.replace(/^\./, ''))) toRestore.push(c);
    }
  }

  // Nuke tous les cookies (CHIPS inclus)
  await chrome.browsingData.remove({ since: 0 }, { cookies: true });

  // Restore les cookies protégés
  for (const cookie of toRestore) {
    const details = {
      url: `${cookie.secure ? 'https' : 'http'}://${cookie.domain.replace(/^\./, '')}${cookie.path}`,
      name: cookie.name,
      value: cookie.value,
      path: cookie.path,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite,
      storeId: cookie.storeId,
    };
    if (!cookie.name.startsWith('__Host-')) details.domain = cookie.domain;
    if (cookie.expirationDate) details.expirationDate = cookie.expirationDate;
    try { await chrome.cookies.set(details); } catch {}
  }

  await loadCookieDomains();
  renderCookieColumns(document.getElementById('cookie-search').value);
}

function setupColDropzone(el, targetCol) {
  let dragCount = 0;

  el.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });

  el.addEventListener('dragenter', e => {
    e.preventDefault();
    if (++dragCount === 1) el.classList.add('drag-over');
  });

  el.addEventListener('dragleave', () => {
    if (--dragCount === 0) el.classList.remove('drag-over');
  });

  el.addEventListener('drop', async e => {
    e.preventDefault();
    dragCount = 0;
    el.classList.remove('drag-over');
    try {
      const { domain, col: fromCol } = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (!domain || fromCol === targetCol) return;
      await moveColItem(domain, targetCol === 'protected');
    } catch {}
  });
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
      autoCleanOnStartup: data.autoCleanOnStartup || false,
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
    if (typeof s.autoCleanOnStartup === 'boolean') toSave.autoCleanOnStartup = s.autoCleanOnStartup;
    if (typeof s.uiLang === 'string') {
      if (['auto', 'en', 'fr', 'es', 'pt', 'de', 'it'].includes(s.uiLang)) toSave.uiLang = s.uiLang;
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

// ── Init ──

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

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Paramètres tab
  document.getElementById('auto-clean-toggle').addEventListener('click', toggleAutoClean);
  document.getElementById('lang-select').addEventListener('change', changeLang);
  document.getElementById('export-btn').addEventListener('click', exportSettings);
  document.getElementById('import-input').addEventListener('change', e => {
    if (e.target.files[0]) importSettings(e.target.files[0]);
    e.target.value = '';
  });

  // Whitelist tab
  document.getElementById('add-btn').addEventListener('click', addDomain);
  document.getElementById('add-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addDomain();
  });
  document.getElementById('site-list').addEventListener('click', async e => {
    const btn = e.target.closest('.site-remove');
    if (btn) await removeDomain(btn.dataset.domain);
  });
  document.getElementById('clear-all-btn').addEventListener('click', clearAll);

  // Cookies tab
  await loadCookieDomains();
  document.getElementById('clean-all-btn').addEventListener('click', cleanNonProtected);
  setupColDropzone(document.getElementById('col-all-body'), 'all');
  setupColDropzone(document.getElementById('col-protected-body'), 'protected');

  document.getElementById('cookies-refresh-btn').addEventListener('click', async () => {
    await loadCookieDomains();
    renderCookieColumns(document.getElementById('cookie-search').value);
  });

  document.getElementById('cookie-search').addEventListener('input', e => {
    renderCookieColumns(e.target.value);
  });
}

document.addEventListener('DOMContentLoaded', init);
