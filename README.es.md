<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)

**Elimina todos los rastros de tu navegador en un clic — con lista blanca para proteger los sitios que te importan.**

![Version](https://img.shields.io/badge/versión-1.5.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![License](https://img.shields.io/badge/licencia-MIT-6b7491?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-4285F4?style=flat-square&logo=googlechrome&logoColor=white) ![Brave](https://img.shields.io/badge/Brave-Compatible-FB542B?style=flat-square&logo=brave&logoColor=white)
![Idiomas](https://img.shields.io/badge/idiomas-6-orange?style=flat-square)

</div>

---

## Capturas de pantalla

<div align="center">

| Popup principal | Ajustes |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/6RWDSfFC/Capture-d-cran-2026-07-25-163713.png) | ![ZeroTrace settings](https://i.ibb.co/0y5NgFT1/Parametre.png) |

| Lista blanca | Gestor de cookies |
|:---:|:---:|
| ![ZeroTrace whitelist](https://i.ibb.co/p6DYDBXW/whitlist.png) | ![ZeroTrace cookies](https://i.ibb.co/XfFzmHVG/Cookies.png) |

</div>

---

## ¿Para qué sirve?

ZeroTrace es una extensión de Chrome que elimina al instante todos los rastros de navegación — cookies, caché, historial, almacenamiento y más — con un solo clic. Permite añadir sitios a una lista blanca para que sus sesiones y datos nunca sean eliminados.

---

## Características

- **Limpieza en 1 clic** — pulsa el botón, listo
- **Rango de tiempo** — limpia la última hora, 24h, 7 días o todo
- **Lista blanca** — protege dominios; sus datos sobreviven a cada limpieza
- **Gestor de cookies** — explora las cookies por dominio, protégelas o elimínalas directamente
- **7 categorías** — activa o desactiva cada una de forma independiente
- **Cierre seguro** — limpia y cierra todas las ventanas del navegador en una acción
- **Incógnito** — abre una ventana privada directamente desde el popup
- **Limpieza automática al iniciar** — limpia automáticamente cada vez que el navegador arranca
- **Copia de seguridad y restauración** — exporta e importa tu configuración en JSON
- **Selector de idioma** — cambia el idioma de la interfaz directamente en los ajustes
- **Manifest V3** — estándar moderno de extensiones Chrome

---

## Categorías de limpieza

| Categoría | Qué se elimina |
|---|---|
| **Navigation Trail** | Historial de navegación y búsqueda |
| **Descargas** | Historial de descargas |
| **Web Cache** | Caché, imágenes, service workers |
| **Cookies & Sessions** | Todas las cookies *(lista blanca protegida)* |
| **LocalStorage** | Preferencias y datos de sitios |
| **IndexedDB** | Bases de datos offline & PWA |
| **Forms & Passwords** | Autocompletar y contraseñas *(desactivado por defecto)* |

---

## Instalación (modo desarrollador)

1. Clona o descarga este repositorio
2. Abre Chrome → `chrome://extensions/` o Brave → `brave://extensions/`
3. Activa el **Modo desarrollador**
4. Haz clic en **Cargar extensión sin empaquetar** y selecciona la carpeta

> Compatible con cualquier navegador basado en Chromium: Chrome, Brave, Edge, Opera, Vivaldi.

---

## Privacidad

ZeroTrace funciona **completamente en local** — ningún dato es recopilado, transmitido ni almacenado en servidores externos.

- Sin analytics, sin telemetría, sin seguimiento de ningún tipo
- Sin scripts inyectados en páginas web
- Los ajustes (lista blanca, preferencias) se sincronizan a través de tu propia cuenta de Google mediante `chrome.storage.sync` — nunca llegan a ningún servidor de terceros
- Todas las operaciones de limpieza se ejecutan directamente en tu navegador, nada sale de tu máquina

**El código fuente es completamente auditable** — cada línea está en este repositorio.

---

## Licencia

MIT — libre de usar, modificar y distribuir.

---

<div align="center">
  Hecho por <a href="https://github.com/Pestovich">Pestovich</a>
</div>
