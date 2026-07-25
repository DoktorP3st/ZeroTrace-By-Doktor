let _translations = null;

async function initI18n() {
  const { uiLang = 'auto' } = await chrome.storage.sync.get('uiLang');
  _translations = null;
  if (uiLang !== 'auto') {
    try {
      const r = await fetch(chrome.runtime.getURL(`_locales/${uiLang}/messages.json`));
      _translations = await r.json();
    } catch {}
  }
}

function t(key) {
  if (_translations?.[key]) return _translations[key].message;
  return chrome.i18n.getMessage(key) || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const msg = t(el.dataset.i18n);
    if (msg) el.textContent = msg;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const msg = t(el.dataset.i18nPlaceholder);
    if (msg) el.placeholder = msg;
  });
}
