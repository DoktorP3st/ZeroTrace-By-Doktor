<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt-pt](https://img.shields.io/badge/lang-pt--pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt-pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)
[![ja](https://img.shields.io/badge/lang-ja-BC002D.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.ja.md)

**Cancella tutte le tracce del browser in un clic — con lista bianca per proteggere i siti importanti.**

![Versione](https://img.shields.io/badge/versione-1.2.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![Licenza](https://img.shields.io/badge/licenza-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Lingue](https://img.shields.io/badge/lingue-7-orange?style=flat-square)

</div>

---

## Screenshot

<div align="center">

| Popup principale | Siti protetti |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/vxFsrFhr/Capture-d-cran-2026-07-25-012630.png) | ![ZeroTrace whitelist](https://i.ibb.co/0Vqr27kw/Capture-d-cran-2026-07-25-012634.png) |

</div>

---

## A cosa serve?

ZeroTrace è un'estensione Chrome che cancella istantaneamente tutte le tracce di navigazione — cookie, cache, cronologia, storage e altro — con un solo clic. Permette di aggiungere siti a una lista bianca in modo che le loro sessioni e dati non vengano mai eliminati.

---

## Funzionalità

- **Pulizia con 1 clic** — premi il pulsante, fatto
- **Lista bianca** — proteggi i domini; i loro dati sopravvivono a ogni pulizia
- **5 categorie** — attiva o disattiva ciascuna in modo indipendente
- **Pulizia automatica alla chiusura** — pulisce automaticamente alla chiusura del browser
- **Statistiche post-pulizia** — cookie e URL eliminati mostrati dopo ogni pulizia
- **Backup e ripristino** — esporta e importa le impostazioni in JSON
- **Selettore lingua** — cambia la lingua dell'interfaccia direttamente nelle impostazioni
- **Manifest V3** — standard moderno delle estensioni Chrome

---

## Categorie di pulizia

| Categoria | Cosa viene rimosso |
|---|---|
| **Navigation Trail** | Cronologia e download |
| **Web Cache** | File in cache, immagini, service worker |
| **Cookies & Sessions** | Tutti i cookie *(lista bianca protetta)* |
| **Site Storage** | LocalStorage, IndexedDB, WebSQL |
| **Forms & Passwords** | Compilazione automatica e password *(disattivato per impostazione predefinita)* |

---

## Installazione (modalità sviluppatore)

1. Clona o scarica questo repository
2. Apri Chrome e vai su `chrome://extensions/`
3. Attiva la **Modalità sviluppatore**
4. Clicca su **Carica estensione non pacchettizzata** e seleziona la cartella

---

## Consiglio — Riparti da zero per risultati ottimali

Per una pulizia completa, cancella prima tutti i dati del browser manualmente (Impostazioni → Cancella dati di navigazione), poi accedi di nuovo a ogni sito importante uno per uno e aggiungilo alla lista bianca. Questo evita che vecchi cookie nascosti persistano tra le pulizie.

---

## Licenza

MIT — libero di usare, modificare e distribuire.

---

<div align="center">
  Creato da <a href="https://github.com/Pestovich">Pestovich</a>
</div>
