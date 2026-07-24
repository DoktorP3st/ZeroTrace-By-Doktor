<div align="center">

# ZeroTrace by Pestovich

**Wipe all browser traces in one click — with whitelist protection for the sites you care about.**

![Version](https://img.shields.io/badge/version-1.0.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)

</div>

---

## Screenshots

<div align="center">

| Main Popup | Protected Sites |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/vxFsrFhr/Capture-d-cran-2026-07-25-012630.png) | ![ZeroTrace whitelist](https://i.ibb.co/0Vqr27kw/Capture-d-cran-2026-07-25-012634.png) |

</div>

---

## What it does

ZeroTrace is a Chrome extension that wipes your browser traces instantly — cookies, cache, history, storage, and more — in a single click. Unlike other cleaners, it lets you whitelist specific sites so their login sessions and data are never touched.

Log out of everything you don't need. Stay logged into everything you do.

---

## Features

- **One-click cleaning** — hit the button, done
- **Site whitelist** — protect any domain from being cleaned; their cookies and data survive every wipe
- **5 cleaning categories** — toggle each one independently
- **Dedicated settings page** — manage your full whitelist in a clean interface, add domains manually
- **Manifest V3** — built on the modern Chrome extension standard

---

## Cleaning categories

| Category | What gets removed |
|---|---|
| **Navigation Trail** | Browsing history & downloads list |
| **Web Cache** | Cached files, images, service workers |
| **Cookies & Sessions** | All cookies *(whitelist protected)* |
| **Site Storage** | LocalStorage, IndexedDB, WebSQL |
| **Forms & Passwords** | Autofill data & saved passwords *(off by default)* |

---

## Install (developer mode)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder

The extension icon will appear in your Chrome toolbar.

---

## Usage

**Protecting a site**
> Navigate to any site, open the extension popup, and click **Protect**. That site's data will be excluded from all future cleans.

**Managing your whitelist**
> Click **Manage protected sites** at the bottom of the popup to open the full settings page. Add domains manually or remove existing ones.

**Cleaning**
> Toggle the categories you want to clean, then press **CLEAN ALL**. Done in seconds.

---

## Project structure

```
ZeroTrace by Pestovich/
├── manifest.json       Chrome extension config (MV3)
├── popup.html/css/js   Main popup interface
├── options.html/css/js Protected sites management page
└── icons/              Extension icons (16, 48, 128px)
```

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">
  Made by <a href="https://github.com/Pestovich">Pestovich</a>
</div>
