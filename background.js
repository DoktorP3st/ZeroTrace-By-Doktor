// Whitelist only protects COOKIES. Everything else is wiped for all sites.

importScripts('cookie-utils.js');

async function safeRemove(options, dataType) {
  try { await chrome.browsingData.remove(options, dataType); } catch {}
}

async function cleanCookies(whitelist) {
  await cleanCookiesKeeping(cookie => isWhitelisted(cookie.domain, whitelist));
}

async function performClean(whitelist, categories) {
  // Migration: old 'storage' key → localStorage + indexedDB
  if (categories.includes('storage')) {
    categories = [...categories.filter(c => c !== 'storage'), 'localStorage', 'indexedDB'];
  }
  // Migration: old 'history' silently included downloads
  if (categories.includes('history') && !categories.includes('downloads')) {
    categories = [...categories, 'downloads'];
  }

  const tasks = [];

  if (categories.includes('history')) {
    tasks.push(chrome.history.deleteAll().catch(() => {}));
  }
  if (categories.includes('downloads')) {
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
  if (categories.includes('localStorage')) {
    const excluded = whitelist.flatMap(w => [`https://${w}`, `http://${w}`]);
    const opts = { since: 0 };
    if (excluded.length) opts.excludedOrigins = excluded;
    tasks.push(safeRemove(opts, { localStorage: true }));
  }
  if (categories.includes('indexedDB')) {
    const excluded = whitelist.flatMap(w => [`https://${w}`, `http://${w}`]);
    const opts = { since: 0 };
    if (excluded.length) opts.excludedOrigins = excluded;
    tasks.push(safeRemove(opts, { indexedDB: true }));
  }
  if (categories.includes('forms')) {
    tasks.push(safeRemove({ since: 0 }, { formData: true }));
    tasks.push(safeRemove({ since: 0 }, { passwords: true }));
  }

  await Promise.allSettled(tasks);
}

chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.sync.get(['autoCleanOnStartup', 'whitelist', 'selectedCategories']);
  if (!data.autoCleanOnStartup) return;
  await performClean(
    data.whitelist || [],
    data.selectedCategories || ['history', 'downloads', 'cache', 'cookies', 'localStorage', 'indexedDB']
  );
});
