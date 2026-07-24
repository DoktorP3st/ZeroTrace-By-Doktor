<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)

**Supprimez toutes vos traces de navigation en un clic — avec une liste blanche pour protéger les sites importants.**

![Version](https://img.shields.io/badge/version-1.0.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![License](https://img.shields.io/badge/licence-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)

</div>

---

## Aperçu

<div align="center">

| Popup principale | Sites protégés |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/vxFsrFhr/Capture-d-cran-2026-07-25-012630.png) | ![ZeroTrace whitelist](https://i.ibb.co/0Vqr27kw/Capture-d-cran-2026-07-25-012634.png) |

</div>

---

## À quoi ça sert

ZeroTrace est une extension Chrome qui efface instantanément toutes vos traces de navigation — cookies, cache, historique, stockage local, et plus — en un seul clic. Contrairement aux autres outils de nettoyage, elle vous permet de protéger certains sites pour que leurs sessions et données ne soient jamais supprimées.

Déconnectez-vous de tout ce dont vous n'avez pas besoin. Restez connecté là où ça compte.

---

## Fonctionnalités

- **Nettoyage en 1 clic** — appuyez sur le bouton, c'est fait
- **Liste blanche de sites** — protégez un domaine ; ses cookies et données survivent à chaque nettoyage
- **5 catégories de nettoyage** — activez ou désactivez chacune indépendamment
- **Nettoyage automatique à la fermeture** — option pour tout nettoyer quand Chrome se ferme
- **Statistiques post-nettoyage** — voyez exactement combien de cookies, URLs et cache ont été supprimés
- **Sauvegarde & Restauration** — exportez vos paramètres en JSON et réimportez-les à tout moment
- **Manifest V3** — basé sur le standard moderne des extensions Chrome

---

## Catégories de nettoyage

| Catégorie | Ce qui est supprimé |
|---|---|
| **Navigation Trail** | Historique de navigation & liste des téléchargements |
| **Web Cache** | Fichiers en cache, images, service workers |
| **Cookies & Sessions** | Tous les cookies *(liste blanche protégée)* |
| **Site Storage** | LocalStorage, IndexedDB, WebSQL |
| **Forms & Passwords** | Données de formulaires & mots de passe *(désactivé par défaut)* |

---

## Installation (mode développeur)

1. Clonez ou téléchargez ce dépôt
2. Ouvrez Chrome et allez sur `chrome://extensions/`
3. Activez le **Mode développeur** (interrupteur en haut à droite)
4. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier du projet

L'icône de l'extension apparaîtra dans votre barre d'outils Chrome.

---

## Utilisation

**Protéger un site**
> Naviguez vers un site, ouvrez la popup de l'extension et cliquez sur **Protect**. Les données de ce site seront exclues de tous les futurs nettoyages.

**Gérer votre liste blanche**
> Cliquez sur **Manage protected sites** en bas de la popup pour ouvrir la page de paramètres. Ajoutez des domaines manuellement ou supprimez des entrées existantes.

**Nettoyer**
> Activez les catégories souhaitées, puis appuyez sur **CLEAN ALL**. Terminé en quelques secondes.

**Nettoyage automatique à la fermeture**
> Activez-le dans les Paramètres — ZeroTrace nettoiera automatiquement à la fermeture de Chrome.

**Sauvegarde & Restauration**
> Exportez votre liste blanche et vos paramètres dans un fichier JSON. Réimportez-les sur n'importe quel appareil.

---

## Licence

MIT — libre d'utilisation, de modification et de distribution.

---

<div align="center">
  Fait par <a href="https://github.com/Pestovich">Pestovich</a>
</div>
