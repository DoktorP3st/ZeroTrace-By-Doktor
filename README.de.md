<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt-pt](https://img.shields.io/badge/lang-pt--pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt-pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)
[![ja](https://img.shields.io/badge/lang-ja-BC002D.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.ja.md)

**Alle Browser-Spuren per Klick löschen — mit Whitelist-Schutz für wichtige Seiten.**

![Version](https://img.shields.io/badge/Version-1.2.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![Lizenz](https://img.shields.io/badge/Lizenz-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Sprachen](https://img.shields.io/badge/Sprachen-7-orange?style=flat-square)

</div>

---

## Screenshots

<div align="center">

| Haupt-Popup | Geschützte Seiten |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/vxFsrFhr/Capture-d-cran-2026-07-25-012630.png) | ![ZeroTrace whitelist](https://i.ibb.co/0Vqr27kw/Capture-d-cran-2026-07-25-012634.png) |

</div>

---

## Was macht es?

ZeroTrace ist eine Chrome-Erweiterung, die alle Browser-Spuren sofort löscht — Cookies, Cache, Verlauf, Speicher und mehr — mit einem einzigen Klick. Wichtige Seiten können auf eine Whitelist gesetzt werden, sodass deren Sitzungen und Daten nie gelöscht werden.

---

## Funktionen

- **Ein-Klick-Bereinigung** — Schaltfläche drücken, fertig
- **Whitelist** — Domains schützen; deren Daten überleben jede Bereinigung
- **5 Kategorien** — jede einzeln aktivieren oder deaktivieren
- **Automatisch beim Schließen bereinigen** — automatisch beim Schließen des Browsers bereinigen
- **Statistiken nach der Bereinigung** — gelöschte Cookies und URLs angezeigt
- **Sicherung & Wiederherstellung** — Einstellungen als JSON exportieren und importieren
- **Sprachauswahl** — Sprache der Oberfläche direkt in den Einstellungen wechseln
- **Manifest V3** — moderner Chrome-Erweiterungsstandard

---

## Bereinigungskategorien

| Kategorie | Was wird gelöscht |
|---|---|
| **Navigation Trail** | Browserverlauf und Downloads |
| **Web Cache** | Cache-Dateien, Bilder, Service Worker |
| **Cookies & Sessions** | Alle Cookies *(Whitelist-Schutz)* |
| **Site Storage** | LocalStorage, IndexedDB, WebSQL |
| **Forms & Passwords** | Autofill und Passwörter *(standardmäßig deaktiviert)* |

---

## Installation (Entwicklermodus)

1. Repository klonen oder herunterladen
2. Chrome öffnen und zu `chrome://extensions/` navigieren
3. **Entwicklermodus** aktivieren (oben rechts)
4. **Entpackte Erweiterung laden** klicken und den Projektordner auswählen

---

## Tipp — Für beste Ergebnisse neu starten

Für eine vollständige Bereinigung zuerst alle Browserdaten manuell löschen (Einstellungen → Browserdaten löschen), dann bei jedem wichtigen Dienst neu anmelden und ihn einzeln zur Whitelist hinzufügen. So wird verhindert, dass alte versteckte Cookies zwischen den Bereinigungen erhalten bleiben.

---

## Lizenz

MIT — frei zu verwenden, zu ändern und zu verteilen.

---

<div align="center">
  Erstellt von <a href="https://github.com/Pestovich">Pestovich</a>
</div>
