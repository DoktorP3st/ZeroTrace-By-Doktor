<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)

**Elimina todos los rastros de tu navegador en un clic — con lista blanca para proteger los sitios que te importan.**

![Version](https://img.shields.io/badge/versión-1.0.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![License](https://img.shields.io/badge/licencia-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)

</div>

---

## Capturas de pantalla

<div align="center">

| Popup principal | Sitios protegidos |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/vxFsrFhr/Capture-d-cran-2026-07-25-012630.png) | ![ZeroTrace whitelist](https://i.ibb.co/0Vqr27kw/Capture-d-cran-2026-07-25-012634.png) |

</div>

---

## ¿Para qué sirve?

ZeroTrace es una extensión de Chrome que elimina al instante todos los rastros de navegación — cookies, caché, historial, almacenamiento local y más — con un solo clic. A diferencia de otras herramientas de limpieza, permite añadir sitios a una lista blanca para que sus sesiones y datos nunca sean eliminados.

Desconéctate de todo lo que no necesitas. Mantén la sesión abierta donde importa.

---

## Características

- **Limpieza en 1 clic** — pulsa el botón, listo
- **Lista blanca de sitios** — protege un dominio; sus cookies y datos sobreviven a cada limpieza
- **5 categorías de limpieza** — activa o desactiva cada una de forma independiente
- **Limpieza automática al cerrar** — opción para limpiar todo cuando se cierra Chrome
- **Estadísticas post-limpieza** — ve exactamente cuántas cookies, URLs y caché se eliminaron
- **Copia de seguridad y restauración** — exporta tu configuración en JSON e impórtala cuando quieras
- **Manifest V3** — construido sobre el estándar moderno de extensiones de Chrome

---

## Categorías de limpieza

| Categoría | Qué se elimina |
|---|---|
| **Navigation Trail** | Historial de navegación y lista de descargas |
| **Web Cache** | Archivos en caché, imágenes, service workers |
| **Cookies & Sessions** | Todas las cookies *(lista blanca protegida)* |
| **Site Storage** | LocalStorage, IndexedDB, WebSQL |
| **Forms & Passwords** | Datos de formularios y contraseñas *(desactivado por defecto)* |

---

## Instalación (modo desarrollador)

1. Clona o descarga este repositorio
2. Abre Chrome y ve a `chrome://extensions/`
3. Activa el **Modo desarrollador** (interruptor en la parte superior derecha)
4. Haz clic en **Cargar extensión sin empaquetar** y selecciona la carpeta del proyecto

El icono de la extensión aparecerá en tu barra de herramientas de Chrome.

---

## Uso

**Proteger un sitio**
> Navega a cualquier sitio, abre el popup de la extensión y haz clic en **Protect**. Los datos de ese sitio quedarán excluidos de todas las limpiezas futuras.

**Gestionar tu lista blanca**
> Haz clic en **Manage protected sites** al final del popup para abrir la página de ajustes. Añade dominios manualmente o elimina entradas existentes.

**Limpiar**
> Activa las categorías que deseas limpiar y pulsa **CLEAN ALL**. Listo en segundos.

**Limpieza automática al cerrar**
> Actívala en Ajustes — ZeroTrace limpiará automáticamente al cerrar Chrome.

**Copia de seguridad y restauración**
> Exporta tu lista blanca y ajustes a un archivo JSON. Impórtalos en cualquier dispositivo.

---

## Licencia

MIT — libre de usar, modificar y distribuir.

---

<div align="center">
  Hecho por <a href="https://github.com/Pestovich">Pestovich</a>
</div>
