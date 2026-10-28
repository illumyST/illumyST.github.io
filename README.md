# stoneisme.com

Stone Chen 的個人網站。Vite + Vue 3 + TypeScript，`vite-ssg` 靜態輸出，GitHub Pages 部署，三語（中文 / English / 日本語）各自獨立路徑。

## 開發

```sh
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # 型別檢查 + 靜態輸出到 dist/
pnpm preview
```

## 結構

```
src/
  locales/        三語內容，每個語系一個 JSON（文案都在這裡改）
  site.ts         不隨語言變的事實：Email、連結、截圖路徑、PDF 路徑、案例錨點
  router.ts       /、/about、/en、/en/about、/ja、/ja/about
  i18n.ts         語系清單、路徑前綴、瀏覽器語言偵測
  pages/          HomePage、AboutPage
  components/     SiteHeader、SiteFooter、ColorBlocks、SectionHead、CopyEmail
  styles/         tokens.css（配色、字體、圓角）、base.css
public/
  CNAME           stoneisme.com
  favicon.svg
```

## 路由與語系

- 中文是預設語系，放在根路徑；英文 `/en`、日文 `/ja`。
- 第一次造訪根路徑且沒有記住的選擇時，依瀏覽器語言導向 `/en` 或 `/ja`；之後記住使用者的選擇（localStorage）。
- 每頁都有 canonical 與 hreflang alternates，搜尋引擎能分辨三個語系。

## 待補素材

- 案例截圖：放到 `public/images/`，再把路徑填進 `src/site.ts` 的 `caseImages`（1600×1000，PNG 或 WebP）。沒有截圖時卡片顯示淡色色塊。
- 履歷 PDF：放到 `public/`，路徑填進 `site.cvPdf`。未填時「下載履歷」連到 Notion 履歷。
- OG image：`public/og.png`，1200×630。

## 部署

push 到 `main` 後，`.github/workflows/deploy.yml` 會建置並部署到 GitHub Pages。Repo 設定的 Pages Source 需改為 **GitHub Actions**。
同網域下的 `/train_monopoly/`、`/project`、`/blog/` 來自其他 repo 的 project pages，不受影響。
