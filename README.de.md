<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)

**Alle Browser-Spuren per Klick löschen — mit Whitelist-Schutz für wichtige Seiten.**

![Version](https://img.shields.io/badge/Version-1.5.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![Lizenz](https://img.shields.io/badge/Lizenz-MIT-6b7491?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-4285F4?style=flat-square&logo=googlechrome&logoColor=white) ![Brave](https://img.shields.io/badge/Brave-Compatible-FB542B?style=flat-square&logo=brave&logoColor=white)
![Sprachen](https://img.shields.io/badge/Sprachen-6-orange?style=flat-square)

</div>

---

## Screenshots

<div align="center">

| Haupt-Popup | Einstellungen |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/6RWDSfFC/Capture-d-cran-2026-07-25-163713.png) | ![ZeroTrace settings](https://i.ibb.co/0y5NgFT1/Parametre.png) |

| Whitelist | Cookie-Manager |
|:---:|:---:|
| ![ZeroTrace whitelist](https://i.ibb.co/p6DYDBXW/whitlist.png) | ![ZeroTrace cookies](https://i.ibb.co/XfFzmHVG/Cookies.png) |

</div>

---

## Was macht es?

ZeroTrace ist eine Chrome-Erweiterung, die alle Browser-Spuren sofort löscht — Cookies, Cache, Verlauf, Speicher und mehr — mit einem einzigen Klick. Wichtige Seiten können auf eine Whitelist gesetzt werden, sodass deren Sitzungen und Daten nie gelöscht werden.

---

## Funktionen

- **Ein-Klick-Bereinigung** — Schaltfläche drücken, fertig
- **Zeitraum** — letzte Stunde, 24h, 7 Tage oder alles bereinigen
- **Whitelist** — Domains schützen; deren Daten überleben jede Bereinigung
- **Cookie-Manager** — Cookies nach Domain durchsuchen, schützen oder direkt löschen
- **7 Kategorien** — jede einzeln aktivieren oder deaktivieren
- **Sicher schließen** — bereinigt und schließt alle Browser-Fenster in einer Aktion
- **Inkognito** — privates Fenster direkt aus dem Popup öffnen
- **Automatisch beim Start bereinigen** — löscht beim Start des Browsers automatisch die ausgewählten Kategorien
- **Sicherung & Wiederherstellung** — Einstellungen als JSON exportieren und importieren
- **Sprachauswahl** — Sprache der Oberfläche direkt in den Einstellungen wechseln
- **Manifest V3** — moderner Chrome-Erweiterungsstandard

---

## Bereinigungskategorien

| Kategorie | Was wird gelöscht |
|---|---|
| **Navigation Trail** | Browser- und Suchverlauf |
| **Downloads** | Download-Verlauf |
| **Web Cache** | Cache-Dateien, Bilder, Service Worker |
| **Cookies & Sessions** | Alle Cookies *(Whitelist-Schutz)* |
| **LocalStorage** | Website-Einstellungen & Daten |
| **IndexedDB** | Offline-Datenbanken & PWA |
| **Forms & Passwords** | Autofill und Passwörter *(standardmäßig deaktiviert)* |

---

## Installation (Entwicklermodus)

1. Repository klonen oder herunterladen
2. Chrome → `chrome://extensions/` oder Brave → `brave://extensions/` öffnen
3. **Entwicklermodus** aktivieren (oben rechts)
4. **Entpackte Erweiterung laden** klicken und den Projektordner auswählen

> Kompatibel mit allen Chromium-Browsern: Chrome, Brave, Edge, Opera, Vivaldi.

---

## Datenschutz

ZeroTrace funktioniert **vollständig lokal** — es werden keine Daten gesammelt, übertragen oder auf externen Servern gespeichert.

- Keine Analytics, keine Telemetrie, kein Tracking jeglicher Art
- Keine Scripts, die in Webseiten injiziert werden
- Einstellungen (Whitelist, Präferenzen) werden über das eigene Google-Konto via `chrome.storage.sync` synchronisiert — sie gelangen nie zu Drittanbieter-Servern
- Alle Bereinigungsvorgänge laufen direkt im Browser ab, nichts verlässt das Gerät

**Der Quellcode ist vollständig prüfbar** — jede Zeile befindet sich in diesem Repository.

---

## Lizenz

MIT — frei zu verwenden, zu ändern und zu verteilen.

---

<div align="center">
  Erstellt von <a href="https://github.com/Pestovich">Pestovich</a>
</div>
