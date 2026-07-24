let whitelist = [];

async function loadWhitelist() {
  const data = await chrome.storage.sync.get('whitelist');
  whitelist = data.whitelist || [];
}

async function saveWhitelist() {
  await chrome.storage.sync.set({ whitelist });
}

function isValidDomain(str) {
  return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(str.trim());
}

function render() {
  const listEl = document.getElementById('site-list');
  const emptyEl = document.getElementById('empty-state');
  const dangerEl = document.getElementById('danger-section');
  const totalEl = document.getElementById('total-count');

  totalEl.textContent = `${whitelist.length} site${whitelist.length !== 1 ? 's' : ''}`;
  listEl.innerHTML = '';

  if (whitelist.length === 0) {
    emptyEl.style.display = 'flex';
    dangerEl.classList.add('hidden');
    return;
  }

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
      <button class="site-remove" data-domain="${domain}">Remove</button>
    `;
    listEl.appendChild(li);
  });
}

async function addDomain() {
  const input = document.getElementById('add-input');
  const errorEl = document.getElementById('add-error');
  const raw = input.value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

  errorEl.className = 'add-error hidden';

  if (!raw) return;

  if (!isValidDomain(raw)) {
    errorEl.textContent = `"${raw}" is not a valid domain (e.g. google.com)`;
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
  if (!confirm('Remove all protected sites? Their data will be cleaned on next Clean All.')) return;
  whitelist = [];
  await saveWhitelist();
  render();
}

async function init() {
  await loadWhitelist();
  render();

  document.getElementById('add-btn').addEventListener('click', addDomain);

  document.getElementById('add-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addDomain();
  });

  document.getElementById('site-list').addEventListener('click', async e => {
    const btn = e.target.closest('.site-remove');
    if (btn) await removeDomain(btn.dataset.domain);
  });

  document.getElementById('clear-all-btn').addEventListener('click', clearAll);
}

document.addEventListener('DOMContentLoaded', init);
