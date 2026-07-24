// Whitelist only protects COOKIES. Everything else is wiped for all sites.

async function safeRemove(options, dataType) {
  try {
    await chrome.browsingData.remove(options, dataType);
  } catch {}
}

async function cleanCookies(whitelist) {
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
}

async function performClean(whitelist, categories) {
  const tasks = [];

  if (categories.includes('history')) {
    tasks.push(chrome.history.deleteAll());
    tasks.push(safeRemove({ since: 0 }, { downloads: true }));
  }
  if (categories.includes('cache')) {
    tasks.push(safeRemove({ since: 0 }, { cache: true }));
    tasks.push(safeRemove({ since: 0 }, { cacheStorage: true }));
    tasks.push(safeRemove({ since: 0 }, { serviceWorkers: true }));
  }
  if (categories.includes('cookies')) {
    tasks.push(cleanCookies(whitelist));
  }
  if (categories.includes('storage')) {
    tasks.push(safeRemove({ since: 0 }, { localStorage: true }));
    tasks.push(safeRemove({ since: 0 }, { indexedDB: true }));
  }
  if (categories.includes('forms')) {
    tasks.push(safeRemove({ since: 0 }, { formData: true }));
    tasks.push(safeRemove({ since: 0 }, { passwords: true }));
  }

  await Promise.allSettled(tasks);
}

chrome.windows.onRemoved.addListener(async () => {
  const windows = await chrome.windows.getAll();
  if (windows.length > 0) return;

  const data = await chrome.storage.sync.get(['autoCleanOnClose', 'whitelist', 'selectedCategories']);
  if (!data.autoCleanOnClose) return;

  const whitelist  = data.whitelist          || [];
  const categories = data.selectedCategories || ['history', 'cache', 'cookies', 'storage'];

  await performClean(whitelist, categories);
});
