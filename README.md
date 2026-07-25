<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)

**Wipe all browser traces in one click — with whitelist protection for the sites you care about.**

![Version](https://img.shields.io/badge/version-1.5.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Languages](https://img.shields.io/badge/languages-6-orange?style=flat-square)

</div>

---

## Screenshots

<div align="center">

| Main Popup | Settings |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/LDpgBpBM/interfaceprincipal.png) | ![ZeroTrace settings](https://i.ibb.co/0y5NgFT1/Parametre.png) |

| Whitelist | Cookie Manager |
|:---:|:---:|
| ![ZeroTrace whitelist](https://i.ibb.co/p6DYDBXW/whitlist.png) | ![ZeroTrace cookies](https://i.ibb.co/XfFzmHVG/Cookies.png) |

</div>

---

## What it does

ZeroTrace is a Chrome extension that wipes your browser traces instantly — cookies, cache, history, storage, and more — in a single click. Unlike other cleaners, it lets you whitelist specific sites so their login sessions and data are never touched.

Log out of everything you don't need. Stay logged into everything you do.

---

## Features

- **One-click cleaning** — hit the button, done
- **Time range** — clean the last hour, 24h, 7 days, or all time
- **Site whitelist** — protect any domain; their cookies survive every wipe
- **Cookie manager** — browse all cookies by domain, move them to whitelist or delete them directly
- **7 cleaning categories** — toggle each one independently
- **Secure close** — clean and close all browser windows in one action
- **Incognito** — open a private window directly from the popup
- **Auto-clean on startup** — optionally wipe everything each time the browser launches
- **Backup & Restore** — export your settings to JSON and reimport them anytime
- **Language selector** — switch the UI language directly in settings (EN, FR, ES, PT, DE, IT)
- **Manifest V3** — built on the modern Chrome extension standard

---

## Cleaning categories

| Category | What gets removed |
|---|---|
| **Navigation Trail** | Browsing & search history |
| **Downloads** | Download history list |
| **Web Cache** | Cached files, images, service workers |
| **Cookies & Sessions** | All cookies *(whitelist protected)* |
| **LocalStorage** | Site preferences & data |
| **IndexedDB** | Offline databases & PWA data |
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

**Cleaning** — Toggle the categories you want, select a time range, then press **CLEAN ALL**.

**Secure close** — Cleans selected categories and closes all browser windows at once.

**Auto-clean on startup** — Enable in Settings to wipe automatically each time the browser launches.

**Cookie manager** — Open Settings → Cookies tab to browse all cookies by domain, protect a site with one click, or delete its cookies immediately.

**Backup & Restore** — Export your settings to JSON, reimport on any device.

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">
  Made by <a href="https://github.com/Pestovich">Pestovich</a>
</div>
