# KYOHEI.MUKAIYAMA2026（ポートフォリオ）

このフォルダが **サイト一式の正本** です（`index.html` / `style.css` / `script.js`、および `assets/`）。

## GitHub に載せる場合

この **`my-portfolio` フォルダをリポジトリのルート** にすると、GitHub Pages の「ルート公開」と相性がよいです。

1. GitHub で新規リポジトリを作成する。
2. このフォルダだけを clone 先にするか、このフォルダで `git init` して push する。

```bash
cd my-portfolio
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### GitHub Pages

Settings → Pages → Branch `main` / folder `/ (root)` で、公開 URL のトップがそのままサイトになります。

## アセット

職務経歴書 PDF は `assets/` に置き、`index.html` の `./assets/...` リンクとファイル名を揃えてください。

## Cursor

`.cursor/rules/portfolio-site.mdc` がこのフォルダ内の編集時に参照されます。
