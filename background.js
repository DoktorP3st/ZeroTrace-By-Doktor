// Whitelist only protects COOKIES. Everything else is wiped for all sites.

async function safeRemove(options, dataType) {
  try { await chrome.browsingData.remove(options, dataType); } catch {}
}

async function cleanCookies(whitelist) {
  const unpartitioned = await chrome.cookies.getAll({});
  let partitioned = [];
  try { partitioned = await chrome.cookies.getAll({ partitionKey: {} }); } catch {}

  const seen = new Set();
  const allVisible = [];
  for (const c of [...unpartitioned, ...partitioned]) {
    const k = `${c.name}|${c.domain}|${c.path}|${c.storeId}|${c.partitionKey?.topLevelSite ?? ''}`;
    if (!seen.has(k)) { seen.add(k); allVisible.push(c); }
  }

  const toKeep = allVisible.filter(cookie => {
    const domain = cookie.domain.replace(/^\./, '');
    return whitelist.some(w => domain === w || domain.endsWith('.' + w));
  });

  try { await chrome.browsingData.remove({ since: 0 }, { cookies: true }); } catch { return; }

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
    tasks.push(safeRemove({ since: 0 }, { localStorage: true }));
  }
  if (categories.includes('indexedDB')) {
    tasks.push(safeRemove({ since: 0 }, { indexedDB: true }));
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
