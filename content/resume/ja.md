---
synced: 2026-11-05
---

<!-- zh-Hant.md の日本語版。agent が同期します。{#id} と各リストの項目数は中文版と同じに保ってください。 -->

# 陳 絲彤

> Stone Chen

## 肩書き {#headline}

フロントエンドエンジニア · テックリード

## 一行紹介 {#summary}

フロントエンドから始まり、プロダクト思考で要件を定め、今はチームを率いて速く届ける。数百万人が毎日使うプロダクトと、それを支えるチームの仕組みをつくっています。

## 所在地 {#location}

台湾中南部、海外駐在も可

## 自己紹介 {#bio}

国立政治大学で広告を学び、日本語をダブルメジャーで専攻しました。2年次のプログラミング入門をクラス1位で修了し、コードで問題を解く手応えを初めて知って以来、この道を歩いています。広告学科で身についたのは、システムではなくユーザーから考える習慣です。

最初のエンジニア職は国泰世華銀行のネットバンキング「CUBE」。規制と品質要求の厳しい環境で、要件を実装する側から、PMと実現可能性を議論しプロジェクトを前に進めるエンジニアへと成長し、AIをチームの開発フローに組み込み始めました。

2026年に台中へ移り、中山医学大学附設病院AIセンターに参加（所属は病院出資のスタートアップ Futago Talents）。テックリード兼TPMとしてフロントエンドチームを率い、臨床向けAIプロダクトを開発しています。

## 主な数字 {#highlights}

- 340万｜月間アクセス、CUBEネットバンク
- +50%｜開発効率、チームのAI harness構築後
- 1ヶ月｜医療AIを要件から本番稼働まで

## 職歴 {#experience}

### フロントエンド テックリード / TPM｜中山医学大学附設病院 AIセンター {#csmuh}

- 勤務地：台中
- 備考：所属：Futago Talents（病院出資のスタートアップ）
- 年表：中山医AIセンター｜フロントエンド テックリード / TPM
- タグ：Vue 3, Nuxt, TypeScript, Web Components, Storybook, 医療AI

#### 主な実績 {#items}

- 台大医院北護分院 内視鏡AI音声カルテシステムのTPM。臨床側・データアナリスト・エンジニアと要件を仕様とタスクに落とし込み、受領から1ヶ月で本番稼働。レポート作成時間−60%、医師の業務時間を約20%節約。
- フロントエンド5プロジェクトの技術棚卸しと統合計画。CDN経由で共有するWeb Componentsライブラリを構築。
- 国家科学技術委員会 金賞受賞プラットフォーム「醫點家」のフロントエンド刷新を主導。第一段階としてAI解析結果のファイルマネージャーを設計。
- アジャイル導入：遅延機能のタスク再分割と優先度見直しで、2週間で主要機能2件の受け入れを完了。
- チームの開発フローを整備：仕様とデモの事前合意、DBスキーマとAPI仕様の先行確定、Mock Server、Storybook、デイリースタンドアップ、新人ハンドブック。
- フロントエンド共通の開発基盤 aic-fe-infra を構築。PRチェック、Dependabotによる自動アップデート、AI Agentの共通ルールとSkillを一元化し、一箇所の修正がバージョン更新だけで全プロジェクトに反映。導入・アップグレードはAIに一言伝えるだけ。

#### 履歴書のみ {#details}

- aic-fe-infra CI：reusable workflowとcomposite actionでPRチェック（インストール、check、build）を統一。Dependabotで毎週のminor／patch更新を1つのPRにまとめる。
- aic-fe-infra Agent設定：.agents/ を唯一の情報源とし、同期スクリプトで共通ルールとプロジェクト固有ルールを統合。Claude Code、Codex、GitHub Copilot向けの指示ファイルとSkill（review-and-ship、record-adr、modern-web-guidance）を生成。
- setup-fe-infra Skillと冪等なinitスクリプトを作成し、導入・更新時にプロジェクト固有設定を上書きしない。新規要件の企画・開発・受け入れチケット構成をLinearに一括作成するSkillも作成。

### フロントエンドエンジニア｜国泰世華銀行 {#cube}

- 勤務地：台北
- 年表：国泰世華銀行｜フロントエンドエンジニア、CUBE
- タグ：React, TypeScript, FinTech, パフォーマンス, AI活用開発, Azure DevOps

#### 主な実績 {#items}

- ネットバンキング「CUBE」：400以上の機能、月間340万アクセス超のプラットフォームで機能開発・改善。投資信託・外貨モジュールを主導（アクセス数トップ10、収益の93%）。
- Grafanaによる監視とオンコール運用、本番障害対応。
- AIコードレビュー（レビュー時間約90%削減）、Figma to Code、回帰テスト・デプロイ・テンプレートの自動化を導入。開発効率+50%。
- n8nで社内ナレッジベースを構築し、40名以上の他部門メンバーがフロントエンドの疑問を自己解決。月約2人日を削減。
- ROBO：アニメーション付き公式サイトをSEOとCore Web Vitalsを意識して再構築。CrUXでLCP −35%、FCP −40%、TTFB −55%。

#### 履歴書のみ {#details}

- 外国債券O2O：連携とコンポーネント再利用を改善し、ロングテール顧客の収益成長を支援。
- 投資信託残高：共通コンポーネント（ヘッダー固定テーブル、ツアー、ページネーション、スケルトン）を開発し、大量データの描画性能を最適化。
- 外貨定期預金：複雑なフォームバリデーションと表示ロジックを実装。
- Orval（OpenAPI）で型を自動生成し、バックエンド連携を効率化。
- MDXでStorybookを拡充し、デザインとドキュメントを同期。
- React ErrorBoundary、バンドルサイズ分析、脆弱性スキャンを実装。
- 開発規約とワークフロー文書を整備し新人の立ち上がりを短縮。フロントエンド勉強会や技術共有にも参加。

### ビジュアルデザイナーアシスタント｜Engoo {#engoo}

- 勤務地：台北
- タグ：Figma, Adobe Ps/Ai, A/Bテスト

#### 主な実績 {#items}

- CI、印刷物、SNS・広告クリエイティブのデザイン。
- Engooのブランドを分析し、プレゼン用マスターと社用封筒をデザイン。
- A/Bテストで各SNSの反応を把握し、広告クリエイティブの方向性を調整。

## 学歴 {#education}

### 国立政治大学 {#nccu}

- 学位：広告学科卒、日本語学科ダブルメジャー
- 年表：国立政治大学｜広告学科、日本語学科ダブルメジャー

## 語学 {#languages}

- 中国語｜ネイティブ
- 英語｜ビジネスレベル｜TOEIC 935
- 日本語｜ビジネスレベル｜JLPT N1

## スキル {#skills}

### フレームワークと言語 {#frameworks}

- 項目：React 19, Vue 3, Nuxt, Web Components, TypeScript, Effect.ts, Jotai, React Hook Form
- 履歴書のみ：JavaScript (ES6+), HTML5, CSS3, SCSS, Yup, i18n, Day.js, Chart.js, three.js

### 品質とパフォーマンス {#quality}

- 項目：Vitest, Storybook, Lighthouse, Web Vitals, Code Splitting, SSG, Orval (OpenAPI)
- 履歴書のみ：Lazy Loading, Bundle analysis, ErrorBoundary

### デリバリーとチーム {#delivery}

- 項目：Azure DevOps, CI/CD, GitHub Actions, Mock Server, Plop, Scrum, Figma
- 履歴書のみ：Git

### AIツール {#ai}

- 項目：AIコードレビュー, Figma to Code, n8n, Ollama, Claude Design System, LLM向けcontext文書
- 履歴書のみ：GitHub Copilot

### UIとデザイン {#design}

- 項目：Chakra UI, Tailwind CSS, Framer Motion, Adobe Ps/Ai

## 作品 {#projects}

### Train Monopoly {#train-monopoly}

台湾鉄道をテーマにしたモノポリー。GitHub Actionsで自動デプロイ。

### 小さなツールと技術の実験 {#playground}

各種小ツールと新技術の実験場。

### グルメブログ {#foodie}

自作のグルメブログ。

### StarsBlooming {#starsblooming}

自作のドライフラワーアクセサリーブランドのためのECサイト。SVGアニメーションとパララックスで奥行きとインタラクションを演出。

## ボランティア {#volunteer}

- ホームレス支援団体ボランティア（2025年〜）
- 動物保護施設ボランティア
- ワールド・ビジョン 撮影ボランティア（2022）

## 趣味 {#interests}

読書（月例の読書会）、ハーフマラソン、ギター
