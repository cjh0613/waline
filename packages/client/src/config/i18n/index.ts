import en from './en';
import jp from './jp';
import zhCN from './zh-CN';
import zhTW from './zh-TW';

import type { Locale } from './typings';

export * from './typings';

export const locales: Record<string, Locale> = {
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en: en,
  'en-US': en,
  jp: jp,
  'jp-JP': jp,
};
