import type { Locale } from './i18n';

export type Avatar =
  | ''
  | 'mp'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'hide';

export type EmojiMaps = Record<string, string>;

export type Meta = 'nick' | 'mail' | 'link';

export type UploadImage = (image: File) => Promise<string>;

export interface WalineOptions {
  /**
   * Waline 的初始化挂载器。必须是一个有效的 **CSS 选择器**
   */
  el: string;

  /**
   * Waline 的服务端地址
   */
  serverURL: string;

  /**
   * 评论框 **占位提示符**
   *
   * @default '撰写评论...'
   */
  placeholder?: string;

  /**
   * 评论字数限制。填入单个数字时为最大字数限制
   *
   * @description 设置为 `0` 时无限制
   *
   * @default 0
   */
  wordLimit?: number | [number, number];

  /**
   * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
   *
   * 可选值:
   *
   * - `window.location.pathname` (默认值，推荐)
   * - `window.location.href`
   * - 自定义
   *
   * > I. 请保证每个 _文章页_ 路径的唯一性，否则可能会出现不同 _文章页_ 下加载相同评论列表的情况。
   * >
   * > II. 如果值为 `window.location.href`，可能会出现随便加 _不同参数_ 进入该页面，而被判断成新页面的情况。
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * [Gravatar](http://cn.gravatar.com/) 头像展示方式
   *
   * 可选值:
   *
   * - `''`
   * - `'mp'`
   * - `'identicon'`
   * - `'monsterid'`
   * - `'wavatar'`
   * - `'retro'`
   * - `'robohash'`
   * - `'hide'`
   *
   * @more 详见 [头像配置](./avatar.md)。
   *
   * @default 'mp'
   */
  avatar?: Avatar;

  /**
   * 评论者相关属性
   *
   * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
   *
   * @default ['nick', 'mail', 'link']
   */
  meta?: Meta[];

  /**
   * 评论列表分页，每页条数
   *
   * @default 10
   */
  pageSize?: number;

  /**
   * Waline 显示语言
   *
   * 可选值:
   *
   * - `'zh'`
   * - `'zh-CN'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'jp'`
   * - `'jp-JP'`
   *
   * @more 如需 _自定义语言_ ，请参考 [多语言支持](https://waline.js.org/client/i18n.html)。
   *
   * @default 'zh-CN'
   */
  lang?: string;

  /**
   * 自定义 waline 显示语言
   *
   * @deprecated
   */
  langMode?: Locale;

  /**
   * 自定义 waline 显示语言
   */
  locale?: Locale;

  /**
   * 文章访问量统计
   *
   * @default false
   */
  visitor?: boolean;

  /**
   * 代码高亮
   *
   * @default true
   */

  highlight?: boolean;

  /**
   * 设置 Gravatar 头像 CDN 地址
   *
   * @default 'https://cdn.v2ex.com/gravatar/'
   */
  avatarCDN?: string;

  /**
   * 每次访问是否**强制**拉取最新的*评论列表头像*
   *
   * @default false
   */
  avatarForce?: boolean;

  /**
   * 设置**表情包 CDN**，详见 [自定义表情](https://waline.js.org/client/emoji.html)
   *
   * @default 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/'
   */
  emojiCDN?: string;

  /**
   * 设置**表情包映射**，详见 [自定义表情](https://waline.js.org/client/emoji.html)
   *
   * @default 微博表情包
   */

  emojiMaps?: EmojiMaps;

  /**
   * 设置**必填项**，默认昵称为匿名
   *
   * @default []
   */
  requiredFields?: Meta[];

  /**
   * 自定义图片上传方法，方便更好的存储图片
   *
   * 方法执行时会将图片对象传入。
   */

  uploadImage?: UploadImage;

  /**
   * 是否允许登录评论
   *
   * 默认情况是两者都支持，设置为 `true` 表示仅支持匿名评论，`false` 表示仅支持登录评论。
   *
   * @default undefined
   */
  anonymous?: boolean;
}
