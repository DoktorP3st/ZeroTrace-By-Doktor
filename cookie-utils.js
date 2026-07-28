// Shared cookie enumeration + whitelist-preserving cleanup logic.
// Loaded by background.js (importScripts), popup.html and options.html (<script>).
//
// chrome.cookies.getAll({}) does not see partitioned cookies (CHIPS, Chrome 115+),
// so callers must also query getAll({ partitionKey: {} }) and dedupe — handled here.

function cookieKey(c) {
  return `${c.name}|${c.domain}|${c.path}|${c.storeId}|${c.partitionKey?.topLevelSite ?? ''}`;
}

async function getAllVisibleCookies() {
  const unpartitioned = await chrome.cookies.getAll({});
  let partitioned = [];
  try { partitioned = await chrome.cookies.getAll({ partitionKey: {} }); } catch {}

  const seen = new Set();
  const all = [];
  for (const c of [...unpartitioned, ...partitioned]) {
    const k = cookieKey(c);
    if (!seen.has(k)) { seen.add(k); all.push(c); }
  }
  return all;
}

function isWhitelisted(cookieDomain, whitelist) {
  const domain = cookieDomain.replace(/^\./, '');
  return whitelist.some(w => domain === w || domain.endsWith('.' + w));
}

async function restoreCookie(cookie) {
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
  // __Host- cookies forbid the `domain` attribute in cookies.set()
  if (!cookie.name.startsWith('__Host-')) details.domain = cookie.domain;
  if (cookie.expirationDate) details.expirationDate = cookie.expirationDate;
  if (cookie.partitionKey !== undefined) details.partitionKey = cookie.partitionKey;
  try { await chrome.cookies.set(details); } catch {}
}

// Nuke ALL cookies (only API that reaches partitioned/CHIPS cookies too),
// then restore whichever ones pass `keep(cookie)`.
// Returns { total, kept } — total visible before the nuke, kept after restore.
async function cleanCookiesKeeping(keep) {
  const allVisible = await getAllVisibleCookies();
  const toKeep = allVisible.filter(keep);

  try {
    await chrome.browsingData.remove({ since: 0 }, { cookies: true });
  } catch {
    return { total: allVisible.length, kept: 0 };
  }

  for (const cookie of toKeep) {
    await restoreCookie(cookie);
  }

  return { total: allVisible.length, kept: toKeep.length };
}
