import DOMPurify from 'dompurify';
import hanabi from 'hanabi';
import marked from 'marked';

import type { EmojiMaps } from '../config';

interface Context {
  emojiCDN: string;
  emojiMaps: EmojiMaps;
  [prop: string]: unknown;
}

/**
 * Add a hook to make all links open a new window
 * and force their rel to be 'noreferrer noopener'
 */
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  // set all elements owning target to target=_blank
  if ('target' in (node as HTMLElement)) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noreferrer noopener');
  }

  // set non-HTML/MathML links to xlink:show=new
  if (
    !node.hasAttribute('target') &&
    (node.hasAttribute('xlink:href') || node.hasAttribute('href'))
  ) {
    node.setAttribute('xlink:show', 'new');
  }

  if ('preload' in (node as HTMLElement)) {
    node.setAttribute('preload', 'none');
  }
});

export const parseEmoji = (
  text: string,
  emojiMaps: EmojiMaps,
  emojiCDN: string
): string => {
  if (!text) {
    return '';
  }

  return text.replace(/:(.+?):/g, (placeholder, key: string) => {
    if (!emojiMaps[key]) {
      return placeholder;
    }

    return `![${key}](${
      /(?:https?:)?\/\//.test(emojiMaps[key])
        ? emojiMaps[key]
        : emojiCDN + emojiMaps[key]
    })`;
  });
};

export const getMarkdownParser = (
  highlight: boolean,
  ctx: Context
): ((comment: string) => string) => {
  marked.setOptions({
    highlight: highlight === false ? undefined : hanabi,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  return (comment: string): string =>
    DOMPurify.sanitize(
      marked(parseEmoji(comment, ctx.emojiMaps, ctx.emojiCDN)),
      {
        FORBID_TAGS: ['form', 'input'],
        FORBID_ATTR: ['autoplay', 'draggable'],
      }
    );
};
