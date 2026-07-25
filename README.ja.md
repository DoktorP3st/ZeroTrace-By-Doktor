<div align="center">

# ZeroTrace by Pestovich

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.fr.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.es.md)
[![pt-pt](https://img.shields.io/badge/lang-pt--pt-green.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.pt-pt.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.de.md)
[![it](https://img.shields.io/badge/lang-it-008C45.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.it.md)
[![ja](https://img.shields.io/badge/lang-ja-BC002D.svg)](https://github.com/Lekarov/ZeroTrace-By-Pestovich/blob/master/README.ja.md)

**ワンクリックでブラウザの痕跡を一掃 — ホワイトリストで重要なサイトのデータを保護。**

![バージョン](https://img.shields.io/badge/バージョン-1.2.0-e63946?style=flat-square)
![Manifest](https://img.shields.io/badge/Manifest-V3-00c896?style=flat-square)
![ライセンス](https://img.shields.io/badge/ライセンス-MIT-6b7491?style=flat-square)
![Platform](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![言語](https://img.shields.io/badge/言語-7-orange?style=flat-square)

</div>

---

## スクリーンショット

<div align="center">

| メインポップアップ | 保護されたサイト |
|:---:|:---:|
| ![ZeroTrace popup](https://i.ibb.co/vxFsrFhr/Capture-d-cran-2026-07-25-012630.png) | ![ZeroTrace whitelist](https://i.ibb.co/0Vqr27kw/Capture-d-cran-2026-07-25-012634.png) |

</div>

---

## 概要

ZeroTrace は Chrome 拡張機能です。Cookie、キャッシュ、閲覧履歴、ストレージなど、ブラウザの痕跡をワンクリックで即座に消去します。重要なサイトをホワイトリストに登録することで、そのデータとセッションが削除されないよう保護できます。

---

## 機能

- **ワンクリッククリア** — ボタンを押すだけで完了
- **サイトホワイトリスト** — ドメインを保護し、データをすべてのクリアから守る
- **5つのカテゴリ** — それぞれ個別にオン/オフ切り替え可能
- **閉じる時に自動クリア** — ブラウザを閉じたときに自動的にクリア
- **クリア後の統計** — 削除されたCookieとURLを表示
- **バックアップ & 復元** — 設定をJSONでエクスポート・インポート
- **言語セレクター** — 設定画面から直接UIの言語を切り替え
- **Manifest V3** — Chrome拡張機能の最新標準に準拠

---

## クリアカテゴリ

| カテゴリ | 削除されるもの |
|---|---|
| **Navigation Trail** | 閲覧履歴とダウンロードリスト |
| **Web Cache** | キャッシュファイル、画像、Service Worker |
| **Cookies & Sessions** | すべてのCookie *(ホワイトリスト保護)* |
| **Site Storage** | LocalStorage、IndexedDB、WebSQL |
| **Forms & Passwords** | 自動入力と保存済みパスワード *(デフォルト無効)* |

---

## インストール（デベロッパーモード）

1. このリポジトリをクローンまたはダウンロード
2. Chrome で `chrome://extensions/` を開く
3. **デベロッパーモード** を有効化（右上のトグル）
4. **パッケージ化されていない拡張機能を読み込む** をクリックし、フォルダを選択

---

## ヒント — ベストな結果のためにゼロからスタート

完全なクリーンアップのためには、まずブラウザのデータをすべて手動で削除し（設定 → 閲覧データを削除）、次に重要なサイトに一つずつ再ログインしてホワイトリストに追加してください。これにより、古い隠れたCookieがクリア間に残ることを防げます。

---

## ライセンス

MIT — 自由に使用・改変・配布可能。

---

<div align="center">
  <a href="https://github.com/Pestovich">Pestovich</a> 作成
</div>
