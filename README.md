# stoneisme.com

Stone Chen 的個人網站。Vite + Vue 3 + TypeScript，`vite-ssg` 靜態輸出，GitHub Pages 部署，三語（中文 / English / 日本語）各自獨立路徑。

## 開發

```sh
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # 型別檢查 + 靜態輸出到 dist/
pnpm preview
```

執行環境需 Node.js 22.18.0 以上（履歷腳本使用原生 TypeScript 支援）。

## 履歷主檔（single source）

網站、Notion 履歷、104 的內容都以 [`content/resume/zh-Hant.md`](content/resume/zh-Hant.md) 為準，包括經歷、成果數字、技能、學歷、語言、作品和聯絡方式。`en.md`、`ja.md` 是它的翻譯。

更新流程：

1. 手動修改 `zh-Hant.md`，並更新開頭的 `updated` 日期。
2. 請 agent「同步履歷」：它會更新英日文翻譯和 Notion，流程寫在 [CLAUDE.md](CLAUDE.md)。
3. push 到 `main`，網站自動部署。
4. 104 從 `zh-Hant.md` 複製貼上，或請 agent 整理成 104 的欄位格式。

`pnpm resume:check` 會檢查三語結構是否對得上，以及英日文的同步日期是否與中文版一致；不一致會回傳失敗。日期一致不代表翻譯內容已經過語意審查。build 時也會檢查結構，三語對不上時 build 會失敗。

## 結構

```
content/
  resume/         履歷主檔：zh-Hant.md（主檔）、en.md、ja.md
  profile.ts      解析三份 md，合併成網站用的資料
  format.ts       網站與腳本共用的格式化工具
scripts/
  resume-check.ts 檢查三語是否一致、翻譯是否已同步
src/
  locales/        網站介面與敘述文案（案例卡片、How I work 等），每個語系一個 JSON
  profile.ts      在 build 時讀入履歷 md
  site.ts         網站專用設定：網址、頭像、截圖、PDF 路徑、案例錨點
  router.ts       /、/about、/en、/en/about、/ja、/ja/about
  i18n.ts         語系清單、路徑前綴、瀏覽器語言偵測
  pages/          HomePage、AboutPage
  components/     SiteHeader、SiteFooter、RecruiterDock、ColorBlocks、SectionHead、CopyEmail
  composables/    useProfile、usePageHead、useTheme、useMessages
  styles/         tokens.css（配色、字體、圓角）、base.css
public/
  CNAME           stoneisme.com
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
