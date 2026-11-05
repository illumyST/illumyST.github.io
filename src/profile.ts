import { buildProfile } from '@content/profile.ts'
import zh from '@content/resume/zh-Hant.md?raw'
import en from '@content/resume/en.md?raw'
import ja from '@content/resume/ja.md?raw'

/** 履歷主檔（content/resume/*.md），供網站與靜態建置使用。 */
export const profile = buildProfile({ 'zh-Hant': zh, en, ja })
