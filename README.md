<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt-pt](https://img.shields.io/badge/lang-pt--pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt-pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)
[![ja](https://img.shields.io/badge/lang-ja-BC002D.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.ja.md)

**Wipe all browser traces in one click — with whitelist protection for the sites you care about.**

![Version](https://img.shields.io/badge/version-1.2.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Languages](https://img.shields.io/badge/languages-7-orange?style=flat-square)

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
- **Site whitelist** — protect any domain; their cookies and data survive every wipe
- **5 cleaning categories** — toggle each one independently
- **Auto-clean on close** — optionally wipe everything when the browser closes
- **Post-clean stats** — see exactly how many cookies and URLs were removed
- **Backup & Restore** — export your settings to JSON and reimport them anytime
- **Language selector** — switch the UI language directly in settings (EN, FR, ES, PT-PT, DE, IT, JA)
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

---

## Usage

**Protecting a site** — Navigate to any site, open the popup, and click **Protect**.

**Managing your whitelist** — Click **Manage protected sites** to open the full settings page.

**Cleaning** — Toggle the categories you want, then press **CLEAN ALL**.

**Auto-clean on close** — Enable in Settings to clean automatically when Chrome closes.

**Backup & Restore** — Export your settings to JSON, reimport on any device.

> **Tip — Get the best results with a clean slate**
> For a complete reset, manually clear all browser data first (Settings → Clear browsing data), then re-login to each important site one by one and add it to the whitelist. This prevents old hidden cookies from persisting between cleans.

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">
  Made by <a href="https://github.com/Pestovich">Pestovich</a>
</div>
