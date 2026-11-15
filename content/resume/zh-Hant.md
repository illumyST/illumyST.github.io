---
updated: 2026-11-16
email: stonechen.fe@gmail.com
linkedin: https://www.linkedin.com/in/chenstone/
linkedinLabel: in/chenstone
github: https://github.com/illumyST
githubLabel: illumyST
resumeZh: https://chen-stone.notion.site/Stone-Chen-2e3e8b07e6cd806488ace21865d18116
resumeEn: https://chen-stone.notion.site/Stone-Chen-Resume-283e8b07e6cd80258647fe61889323ca
stack: React, TypeScript, Vue 3
---

<!--
  履歷主檔（中文為主）。網站、Notion 履歷、104 都以這份為準。

  - 改完這份，更新上面的 updated 日期，再請 agent 同步 en.md、ja.md 和 Notion。
  - 標題後面的 {#id} 是識別碼，三語檔案用它對應，不要改也不要翻譯。
  - 期間、管道、網址、圖片、聯絡方式只寫在這份，英日文檔不用寫。
  - 「管道」不寫代表網站、Notion、104 都會用到；寫了就只出現在列出的管道（site, notion, 104）。
  - 「重點」網站和履歷都會顯示；「履歷限定」只出現在 Notion 與 104。
  - 這個 repo 是 public：電話、住址、薪資等不公開的資料不要寫進來。
-->

# 陳絲彤

> Stone Chen

## 職稱 {#headline}

前端工程師 · 技術負責人

## 一句話介紹 {#summary}

從前端開發、產品需求定義，到帶領團隊加速交付。有大流量金融產品與醫療 AI 產品實戰經驗，熟悉 React、Vue 3、TypeScript，也為團隊建立 AI 開發基礎建設。

## 地點 {#location}

全台、海外皆可

## 自我介紹 {#bio}

我畢業於國立政治大學，主修廣告與日文。橫跨行銷、設計與語言的學習，讓我習慣從使用者與產品的角度思考問題。大二修習程式設計概論時以第一名修畢，第一次體會到用程式解決問題的成就感，從此投入技術學習，轉職成為前端工程師。

在國泰世華的近三年，我參與 CUBE 網路銀行開發，主導基金與外幣模組，支撐每月超過 340 萬次的訪問。在高度法規與品質要求的環境中，我從需求的實作者，成長為能以前端專業與 PM 討論可行性、推進專案落地的工程師。

2026 年，我加入中山醫的 AI 中心，擔任前端技術負責人兼 TPM。我在臨床端、資料分析師與工程團隊之間轉譯需求，讓腸胃鏡 AI 語音病歷系統在需求接收後一個月內上線；也針對延宕的功能重新拆解任務，兩週內完成兩項重大功能驗收。

除了需求開發，我也持續深化 AI 應用：從一開始用 AI 加速自己的開發，到在國泰把 AI 帶進團隊的單一環節（例如以 n8n 建立知識庫），再到在中山醫建置團隊的 AI 開發基礎建設，讓 AI 從個人工具變成整個團隊的工作方式。

回顧自己的學習與工作歷程，從跨領域背景到技術負責人，我始終相信「不設限」是成長的關鍵。我期許自己能如名字中的「絲」一般，具備高度適應力，在變動中持續累積專業厚度，並在團隊中成為能讓產品更穩定、流程更順暢的工程師。

## 關鍵數字 {#highlights}

- 340 萬｜每月訪問次數，CUBE 網銀
- +50%｜開發效率，建立團隊的 AI harness 和開發工具
- 1 個月｜醫療 AI 系統從需求到上線

## 經歷 {#experience}

### 前端技術負責人 / TPM｜中山醫學大學附設醫院 AI 中心 {#csmuh}

- 期間：2026-07 ~ 至今
- 地點：台中
- 備註：任職於賦拓智能股份有限公司（醫院注資新創）
- 年表：中山醫 AI 中心｜前端技術負責人 / TPM
- 標籤：Vue 3, Nuxt, TypeScript, Web Components, Storybook, AI Agent, 醫療 AI

#### 重點 {#items}

- 台大醫院北護分院腸胃鏡 AI 語音病歷系統 TPM：與臨床端、資料分析師及工程團隊將醫療需求轉為規格與任務，需求接收後一個月內上線；報告產出時間縮短 60%，醫師每日省下近 20% 工時。
- 梳理近 5 個前端專案並規劃技術收斂；建置 Web Components 共用元件庫，透過 CDN 跨專案共用。
- 主導國科會金獎平台「醫點家」前端現代化，規劃 Django 平台逐步前後端分離，首階段負責 AI 解析結果的檔案總管。
- 以 Orval 從 OpenAPI 規格自動產生型別，串接 RESTful API，加速前後端協作。
- 導入敏捷：重新拆解延宕功能與排定優先級，兩週內完成兩項重大功能驗收；建立專案進度與任務透明化機制。
- 帶領 4 人工程師團隊，建立團隊開發流程：規格與 demo 先對齊、DB schema 與 API spec 先行、Mock Server、Storybook、每日站會與新人手冊。
- 建立前端共用開發基礎建設 aic-fe-infra：統一團隊的 AI Agent 規範與 Skill，讓 Claude Code、Codex、Copilot 跨專案維持一致的產出品質；PR 檢查與 Dependabot 自動升版也一處修改、各專案升版即生效。

#### 履歷限定 {#details}

- aic-fe-infra CI：以 reusable workflow 與 composite action 統一 PR 檢查（安裝、check、build），Dependabot 每週把 minor／patch 升級併成單一 PR。
- aic-fe-infra Agent 設定：以 .agents/ 為唯一來源，同步腳本合併共用與專案規範，產出 Claude Code、Codex、GitHub Copilot 各自的指令檔與 Skill（review-and-ship、record-adr、modern-web-guidance）。
- 撰寫 setup-fe-infra Skill 與可重複執行的 init 腳本，導入或升級時不覆蓋專案自訂設定；另做 Linear 開單 Skill，一次開出需求的規劃、開發、驗收單子架構。

### 前端工程師｜國泰世華商業銀行 {#cube}

- 期間：2023-09 ~ 2026-07
- 地點：台北
- 年表：國泰世華銀行｜前端工程師，CUBE 網銀
- 標籤：React, TypeScript, 金融科技, 效能優化, AI 輔助開發, Azure DevOps

#### 重點 {#items}

- CUBE 網路銀行：在 400 多項功能、每月 340 萬次以上訪問、年度營收達數億元規模的平台上開發與優化功能，主導基金與外幣模組（流量前 10，營收佔 93%）。
- 值班維運：以 Grafana 監控分析並處理線上問題。
- 導入 AI 輔助 code review（審查時間降低約 90%）、Figma to Code，以及回歸測試、部署與程式碼樣板的自動化，開發效率提升 50%。
- 以 n8n 建立內部知識庫，讓 40 多位跨部門成員自行解決前端問題，每月省下約 2 人天。
- ROBO：重建具動畫效果的官網並優化 SEO 與 Core Web Vitals；CrUX 顯示 LCP −35%、FCP −40%、TTFB −55%。

#### 履歷限定 {#details}

- 國外債券 O2O：提升協作與元件重用，支撐長尾用戶的營收成長。
- 基金庫存：開發共用元件（凍頂表格、導覽、分頁、Skeleton），並優化大量資料的渲染效能。
- 外幣定存：處理複雜的表單驗證與顯示邏輯。
- 以 Orval（OpenAPI）自動產生型別，加速前後端串接。
- 以 MDX 強化 Storybook，讓設計與文件同步更新。
- 實作 React ErrorBoundary、Bundle Size 分析與資安弱點掃描。
- 撰寫開發規範與工作流程文件，縮短新進同仁上手時間；參與前端讀書會與技術分享。

### 視覺設計師助理｜Engoo 英宇科技股份有限公司 {#engoo}

- 期間：2021 ~ 2022
- 地點：台北
- 標籤：Figma, Adobe Ps/Ai, A/B 測試
- 管道：notion, 104

#### 重點 {#items}

- CIS 設計、印刷品設計、社群及廣告素材設計。
- 分析 Engoo 企業形象，設計簡報母片及企業信封。
- 以 A/B test 了解不同社群的偏好，調整廣告素材的設計方向。

## 學歷 {#education}

### 國立政治大學 {#nccu}

- 學位：廣告學系，雙主修日本語文學系
- 期間：2017 ~ 2023
- 年表：政治大學｜廣告系，雙主修日文

## 語言 {#languages}

- 中文｜母語
- 英文｜可工作溝通｜TOEIC 935
- 日文｜可工作溝通｜JLPT N1

## 技能 {#skills}

### 框架與語言 {#frameworks}

- 項目：React 19, Vue 3, Nuxt, Web Components, TypeScript, Effect.ts, Jotai, React Hook Form
- 履歷限定：JavaScript (ES6+), HTML5, CSS3, SCSS, Yup, i18n, Day.js, Chart.js, three.js, RESTful API

### 品質與效能 {#quality}

- 項目：Vitest, Storybook, Lighthouse, Web Vitals, Code Splitting, SSG, Orval (OpenAPI)
- 履歷限定：Lazy Loading, Bundle analysis, ErrorBoundary

### 交付與團隊 {#delivery}

- 項目：Vite, Azure DevOps, CI/CD, GitHub Actions, Mock Server, Plop, Scrum, Figma
- 履歷限定：Git

### AI 工具 {#ai}

- 項目：Claude Code, Codex, AI Agent Skill, AI code review, Figma to Code, n8n, Claude Design System, LLM context 文件, Discord Bot 第二大腦
- 履歷限定：GitHub Copilot, Ollama

### 設計與樣式 {#design}

- 項目：Chakra UI, Tailwind CSS, Framer Motion, Adobe Ps/Ai
- 管道：notion, 104

## 作品 {#projects}

### 火車大富翁 {#train-monopoly}

- 網址：https://stoneisme.com/train_monopoly/
- 圖片：/images/side-train.webp

台灣鐵路版大富翁小遊戲，GitHub Actions 自動部署。

### 小工具與新技術試玩 {#playground}

- 網址：https://stoneisme.com/project
- 圖片：/images/side-playground.webp
- 管道：site

各式小工具與新技術的實驗場。

### 美食部落格 {#foodie}

- 網址：https://stoneisme.com/blog/foodie/
- 圖片：/images/side-foodie.webp
- 管道：site

自建的美食部落格。

### StarsBlooming {#starsblooming}

- 網址：https://illumyst.github.io/StarsBlooming_personalProject/pages/index.html
- 管道：notion, 104

為自己的手工乾燥花飾品品牌，從視覺設計到開發部署一手包辦，以 SVG 動畫與視差滾動增加頁面層次與互動感。

### 個人網站 {#personal-site}

- 網址：https://stoneisme.com
- 管道：notion, 104

以單一履歷主檔驅動網站、Notion 與 104，中、英、日三語由 AI Agent 同步並以結構驗證確保一致；收錄作品集與小工具實驗場。

## 志工 {#volunteer}

- 無家者社福機構志工（2025 至今）
- 流浪動物之家志工
- 世界展望會攝影志工（2022）

## 興趣 {#interests}

讀書（每月讀書會）、半程馬拉松、吉他
