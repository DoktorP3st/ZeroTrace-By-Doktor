<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)

**Supprimez toutes vos traces de navigation en un clic — avec liste blanche pour protéger les sites importants.**

![Version](https://img.shields.io/badge/version-1.6.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![Licence](https://img.shields.io/badge/licence-GPL--v3-6b7491?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-4285F4?style=flat-square&logo=googlechrome&logoColor=white) ![Brave](https://img.shields.io/badge/Brave-Compatible-FB542B?style=flat-square&logo=brave&logoColor=white)
![Langues](https://img.shields.io/badge/langues-6-orange?style=flat-square)

</div>

---

## Aperçu

<div align="center">

| Popup principale | Paramètres |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/6RWDSfFC/Capture-d-cran-2026-07-25-163713.png) | ![ZeroTrace settings](https://i.ibb.co/0y5NgFT1/Parametre.png) |

| Liste blanche | Gestionnaire de cookies |
|:---:|:---:|
| ![ZeroTrace whitelist](https://i.ibb.co/p6DYDBXW/whitlist.png) | ![ZeroTrace cookies](https://i.ibb.co/XfFzmHVG/Cookies.png) |

</div>

---

## À quoi ça sert

ZeroTrace est une extension Chrome qui efface instantanément toutes vos traces de navigation — cookies, cache, historique, stockage local, et plus — en un seul clic. Elle vous permet de protéger certains sites pour que leurs sessions et données ne soient jamais supprimées.

Déconnectez-vous de tout ce dont vous n'avez pas besoin. Restez connecté là où ça compte.

---

## Fonctionnalités

- **Nettoyage en 1 clic** — appuyez sur le bouton, c'est fait
- **Plage horaire** — nettoyez la dernière heure, 24h, 7 jours ou tout
- **Liste blanche de sites** — protégez un domaine ; ses cookies, localStorage et IndexedDB survivent à chaque nettoyage
- **Gestionnaire de cookies** — parcourez les cookies par domaine, protégez-les ou supprimez-les directement
- **7 catégories de nettoyage** — activez ou désactivez chacune indépendamment
- **Fermeture sécurisée** — nettoie et ferme toutes les fenêtres du navigateur en une action
- **Incognito** — ouvrez une fenêtre privée directement depuis la popup
- **Nettoyage auto au démarrage** — nettoie automatiquement à chaque lancement du navigateur
- **Sauvegarde & Restauration** — exportez vos paramètres en JSON et réimportez-les à tout moment
- **Sélecteur de langue** — changez la langue de l'interface directement dans les paramètres
- **Manifest V3** — basé sur le standard moderne des extensions Chrome

---

## Catégories de nettoyage

| Catégorie | Ce qui est supprimé |
|---|---|
| **Navigation Trail** | Historique de navigation & recherche |
| **Téléchargements** | Historique des téléchargements |
| **Web Cache** | Fichiers en cache, images, service workers |
| **Cookies & Sessions** | Tous les cookies *(liste blanche protégée)* |
| **LocalStorage** | Préférences et données des sites *(liste blanche protégée)* |
| **IndexedDB** | Bases de données hors-ligne & PWA *(liste blanche protégée)* |
| **Forms & Passwords** | Formulaires & mots de passe *(désactivé par défaut)* |

---

## Installation (mode développeur)

1. Clonez ou téléchargez ce dépôt
2. Ouvrez Chrome → `chrome://extensions/` ou Brave → `brave://extensions/`
3. Activez le **Mode développeur** (interrupteur en haut à droite)
4. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier

> Compatible avec tous les navigateurs Chromium : Chrome, Brave, Edge, Opera, Vivaldi.

---

## Utilisation

**Protéger un site** — Naviguez vers un site, ouvrez la popup et cliquez sur **Protéger**.

**Gérer la liste blanche** — Cliquez sur **Paramètres** pour ouvrir les paramètres complets.

**Nettoyer** — Activez les catégories souhaitées, choisissez une plage horaire, puis appuyez sur **TOUT NETTOYER**.

**Fermeture sécurisée** — Nettoie les catégories sélectionnées et ferme toutes les fenêtres du navigateur d'un coup.

**Nettoyage auto au démarrage** — Activez dans les Paramètres pour nettoyer automatiquement à chaque lancement.

**Gestionnaire de cookies** — Ouvrez Paramètres → onglet Cookies pour parcourir les cookies par domaine, protéger un site d'un clic ou supprimer ses cookies immédiatement.

**Sauvegarde & Restauration** — Exportez vos paramètres en JSON, réimportez sur n'importe quel appareil.

---

## Confidentialité

ZeroTrace fonctionne **entièrement en local** — aucune donnée n'est collectée, transmise ou stockée sur des serveurs externes.

- Aucun analytics, aucune télémétrie, aucun tracking
- Aucun script injecté dans les pages web
- Les paramètres (liste blanche, préférences) se synchronisent via votre propre compte Google via `chrome.storage.sync` — ils ne transitent par aucun serveur tiers
- Toutes les opérations de nettoyage s'exécutent directement dans votre navigateur, rien ne quitte votre machine

**Le code source est entièrement auditable** — chaque ligne est dans ce dépôt.

---

## Licence

GNU General Public License v3.0 — voir [LICENSE](LICENSE).

Tout dérivé doit rester open-source sous la même licence. L'utilisation commerciale sans publication du code source n'est pas autorisée.

> ZeroTrace est avant tout un projet personnel : une alternative rapide et 100 % locale aux extensions de nettoyage de navigateur comme Click&Clean, conçue d'abord pour mon propre usage quotidien — aucun serveur, aucune collecte de données, aucune télémétrie, et chaque ligne de code ouverte à la lecture de tous. La partager publiquement m'a semblé naturel : si elle est utile à d'autres aussi, tant mieux, mais ce n'était pas le but premier. Aucune intention commerciale.

---

<div align="center">
  Fait par <a href="https://github.com/Lekarov">Pestovich</a>
</div>
