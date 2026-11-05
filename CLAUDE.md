# stoneisme.com

## 履歷主檔

[content/resume/zh-Hant.md](content/resume/zh-Hant.md) 是網站、Notion 履歷、104 的唯一來源，由使用者手動編輯。`en.md`、`ja.md` 是它的翻譯，由 agent 維護。網站在 build 時透過 [content/profile.ts](content/profile.ts) 解析這三份檔案。三份檔案的結構對不上時，build 會失敗。

格式規則寫在 `zh-Hant.md` 開頭的註解裡。

### 使用者說「同步履歷」「更新 Notion」時

1. **找出改了什麼。** 比對 `zh-Hant.md` 的 `updated` 和 `en.md`、`ja.md` 的 `synced`，再用 `git log -p content/resume/zh-Hant.md` 找出這段期間中文版的變更。
2. **更新翻譯。** 只改有變動的地方。保持每個 `{#id}` 不變，每個清單的條數要跟中文版一樣。期間、管道、網址、圖片只寫在中文版。改完後把 `synced` 設成中文版的 `updated`。
3. **驗證。** `pnpm resume:check` 和 `pnpm build` 都要通過。
4. **更新 Notion。** 中文頁面 `2e3e8b07e6cd806488ace21865d18116` 對應 `zh-Hant.md`，英文頁面 `283e8b07e6cd80258647fe61889323ca` 對應 `en.md`。
   - 只放 `管道` 包含 notion 的項目，或沒有寫 `管道` 的項目。「重點」和「履歷限定」都要放。
   - md 裡沒有的私人資料（例如電話），在 Notion 上保留原狀，不要移除也不要寫進 md。
   - 寫入 Notion 前，先把要改的內容給使用者看過。
5. **104 沒有 API。** 使用者要更新 104 時，從 `zh-Hant.md` 整理出各欄位的文字給他貼上，只放 `管道` 包含 104 或沒有寫 `管道` 的項目。

### 注意

- 這個 repo 是 public。電話、住址、薪資、身分證等資料不要寫進任何檔案。
- 首頁案例卡片的文案在 `src/locales/*.json` 的 `work.items`，裡面也有成果數字。經歷的數字改了，要提醒使用者這裡可能也要改。
