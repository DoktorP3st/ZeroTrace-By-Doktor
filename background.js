const DEFAULT_CATEGORIES = ['history', 'cache', 'cookies', 'storage'];

function isUrlProtected(url, whitelist) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return whitelist.some(w => hostname === w || hostname.endsWith('.' + w));
  } catch {
    return false;
  }
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
    return chrome.cookies.remove({ url: `${protocol}://${host}${cookie.path}`, name: cookie.name, storeId: cookie.storeId });
  }));
  return toDelete.length;
}

async function cleanHistory(whitelist) {
  const items = await chrome.history.search({ text: '', maxResults: 100000, startTime: 0 });
  const toDelete = items.filter(item => !isUrlProtected(item.url, whitelist));
  await Promise.allSettled(toDelete.map(item => chrome.history.deleteUrl({ url: item.url })));
  return toDelete.length;
}

async function cleanWithExclusions(dataTypes, whitelist) {
  const excludedOrigins = whitelist.flatMap(domain => [
    `https://${domain}`, `http://${domain}`,
    `https://www.${domain}`, `http://www.${domain}`
  ]);
  await chrome.browsingData.remove({ since: 0, excludedOrigins }, dataTypes);
}

async function performClean(whitelist, categories) {
  const tasks = [];

  if (categories.includes('history')) {
    tasks.push(cleanHistory(whitelist));
    tasks.push(chrome.browsingData.remove({ since: 0 }, { downloads: true }).then(() => 0));
  }
  if (categories.includes('cache')) {
    tasks.push(cleanWithExclusions({ cache: true, cacheStorage: true, serviceWorkers: true }, whitelist).then(() => 0));
  }
  if (categories.includes('cookies')) {
    tasks.push(cleanCookies(whitelist));
  }
  if (categories.includes('storage')) {
    tasks.push(cleanWithExclusions({ localStorage: true, indexedDB: true, webSQL: true, fileSystems: true }, whitelist).then(() => 0));
  }
  if (categories.includes('forms')) {
    tasks.push(chrome.browsingData.remove({ since: 0 }, { formData: true, passwords: true }).then(() => 0));
  }

  await Promise.allSettled(tasks);
}

chrome.windows.onRemoved.addListener(async () => {
  const windows = await chrome.windows.getAll();
  if (windows.length > 0) return;

  const data = await chrome.storage.sync.get(['autoCleanOnClose', 'whitelist', 'selectedCategories']);
  if (!data.autoCleanOnClose) return;

  const whitelist = data.whitelist || [];
  const categories = data.selectedCategories || DEFAULT_CATEGORIES;

  await performClean(whitelist, categories);
});
