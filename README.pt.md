<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)

**Apague todos os rastros do navegador com um clique — com lista branca para proteger os sites importantes.**

![Versão](https://img.shields.io/badge/versão-1.5.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![Licença](https://img.shields.io/badge/licença-MIT-6b7491?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-4285F4?style=flat-square&logo=googlechrome&logoColor=white) ![Brave](https://img.shields.io/badge/Brave-Compatible-FB542B?style=flat-square&logo=brave&logoColor=white)
![Idiomas](https://img.shields.io/badge/idiomas-6-orange?style=flat-square)

</div>

---

## Capturas de ecrã

<div align="center">

| Popup principal | Definições |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/6RWDSfFC/Capture-d-cran-2026-07-25-163713.png) | ![ZeroTrace settings](https://i.ibb.co/0y5NgFT1/Parametre.png) |

| Lista branca | Gestor de cookies |
|:---:|:---:|
| ![ZeroTrace whitelist](https://i.ibb.co/p6DYDBXW/whitlist.png) | ![ZeroTrace cookies](https://i.ibb.co/XfFzmHVG/Cookies.png) |

</div>

---

## Para que serve?

ZeroTrace é uma extensão Chrome que apaga instantaneamente todos os rastros de navegação — cookies, cache, histórico, armazenamento e mais — com um único clique. Permite adicionar sites a uma lista branca para que as suas sessões e dados nunca sejam eliminados.

---

## Funcionalidades

- **Limpeza com 1 clique** — prima o botão, pronto
- **Intervalo de tempo** — limpe a última hora, 24h, 7 dias ou tudo
- **Lista branca de sites** — proteja domínios; os seus dados sobrevivem a cada limpeza
- **Gestor de cookies** — navegue pelos cookies por domínio, proteja-os ou elimine-os diretamente
- **7 categorias** — ative ou desative cada uma de forma independente
- **Fecho seguro** — limpa e fecha todas as janelas do navegador numa ação
- **Incógnito** — abra uma janela privada diretamente a partir do popup
- **Limpeza automática no arranque** — limpa automaticamente cada vez que o navegador arranca
- **Cópia de segurança e restauro** — exporte e importe as definições em JSON
- **Seletor de idioma** — mude o idioma da interface diretamente nas definições
- **Manifest V3** — padrão moderno de extensões Chrome

---

## Categorias de limpeza

| Categoria | O que é eliminado |
|---|---|
| **Navigation Trail** | Histórico de navegação e pesquisa |
| **Transferências** | Histórico de transferências |
| **Web Cache** | Ficheiros em cache, imagens, service workers |
| **Cookies & Sessions** | Todos os cookies *(lista branca protegida)* |
| **LocalStorage** | Preferências e dados dos sites |
| **IndexedDB** | Bases de dados offline & PWA |
| **Forms & Passwords** | Preenchimento automático e palavras-passe *(desativado por defeito)* |

---

## Instalação (modo programador)

1. Clone ou descarregue este repositório
2. Abra o Chrome → `chrome://extensions/` ou Brave → `brave://extensions/`
3. Ative o **Modo de programador**
4. Clique em **Carregar extensão não empacotada** e selecione a pasta

> Compatível com qualquer navegador baseado em Chromium: Chrome, Brave, Edge, Opera, Vivaldi.

---

## Privacidade

O ZeroTrace funciona **inteiramente em local** — nenhum dado é recolhido, transmitido ou armazenado em servidores externos.

- Sem analytics, sem telemetria, sem rastreamento de qualquer tipo
- Sem scripts injetados em páginas web
- As definições (lista branca, preferências) sincronizam através da sua própria conta Google via `chrome.storage.sync` — nunca chegam a qualquer servidor de terceiros
- Todas as operações de limpeza são executadas diretamente no seu navegador, nada sai da sua máquina

**O código fonte é completamente auditável** — cada linha está neste repositório.

---

## Licença

MIT — livre de usar, modificar e distribuir.

---

<div align="center">
  Feito por <a href="https://github.com/Pestovich">Pestovich</a>
</div>
