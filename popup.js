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

function renderShield() {
  const shieldBtn = document.getElementById('shield-btn');
  const shieldLabel = document.getElementById('shield-label');
  const badge = document.getElementById('wl-count-badge');

  badge.textContent = whitelist.length;

  if (!currentDomain) return;

  const isProtected = isDomainProtected(currentDomain);
  shieldBtn.classList.toggle('active', isProtected);
  shieldLabel.textContent = isProtected ? 'Protected' : 'Protect';
}

async function toggleProtection() {
  if (!currentDomain) return;

  const idx = whitelist.indexOf(currentDomain);
  if (idx === -1) {
    whitelist.push(currentDomain);
  } else {
    whitelist.splice(idx, 1);
  }

  await saveWhitelist();
  renderShield();
}

function getSelectedCategories() {
  return Array.from(document.querySelectorAll('input[name="cat"]:checked')).map(cb => cb.value);
}

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
}

async function cleanHistory() {
  const items = await chrome.history.search({ text: '', maxResults: 100000, startTime: 0 });
  const toDelete = items.filter(item => !isUrlProtected(item.url));
  await Promise.allSettled(toDelete.map(item => chrome.history.deleteUrl({ url: item.url })));
}

async function cleanWithExclusions(dataTypes) {
  const excludedOrigins = whitelist.flatMap(domain => [
    `https://${domain}`,
    `http://${domain}`,
    `https://www.${domain}`,
    `http://www.${domain}`
  ]);
  await chrome.browsingData.remove({ since: 0, excludedOrigins }, dataTypes);
}

async function cleanAll() {
  const categories = getSelectedCategories();
  if (categories.length === 0) return;

  const cleanBtn = document.getElementById('clean-btn');
  const statusEl = document.getElementById('status');
  const originalHTML = cleanBtn.innerHTML;

  cleanBtn.disabled = true;
  cleanBtn.innerHTML = `<span style="opacity:.7">Cleaning...</span>`;
  statusEl.className = 'status hidden';

  try {
    const tasks = [];

    if (categories.includes('history')) {
      tasks.push(cleanHistory());
      tasks.push(chrome.browsingData.remove({ since: 0 }, { downloads: true }));
    }
    if (categories.includes('cache')) {
      tasks.push(cleanWithExclusions({ cache: true, cacheStorage: true, serviceWorkers: true }));
    }
    if (categories.includes('cookies')) {
      tasks.push(cleanCookies());
    }
    if (categories.includes('storage')) {
      tasks.push(cleanWithExclusions({ localStorage: true, indexedDB: true, webSQL: true, fileSystems: true }));
    }
    if (categories.includes('forms')) {
      tasks.push(chrome.browsingData.remove({ since: 0 }, { formData: true, passwords: true }));
    }

    await Promise.allSettled(tasks);

    statusEl.textContent = '✓ Browser cleaned successfully!';
    statusEl.className = 'status success';
  } catch (err) {
    console.error(err);
    statusEl.textContent = '✗ An error occurred during cleaning';
    statusEl.className = 'status error';
  } finally {
    cleanBtn.disabled = false;
    cleanBtn.innerHTML = originalHTML;
  }
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentDomain = tab?.url ? extractDomain(tab.url) : null;

  const domainEl = document.getElementById('current-domain');
  const shieldBtn = document.getElementById('shield-btn');

  if (currentDomain && !currentDomain.startsWith('chrome')) {
    domainEl.textContent = currentDomain;
  } else {
    domainEl.textContent = 'Not a web page';
    shieldBtn.disabled = true;
    currentDomain = null;
  }

  await loadWhitelist();
  renderShield();

  shieldBtn.addEventListener('click', toggleProtection);
  document.getElementById('clean-btn').addEventListener('click', cleanAll);
  document.getElementById('settings-btn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}

document.addEventListener('DOMContentLoaded', init);
