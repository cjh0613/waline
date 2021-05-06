import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Context from './context';
import {
  Visitor,
  checkInitOptions,
  fetchCount,
  fetchRecent,
  registMathML,
} from './utils';

import type { WalineOptions } from './config';
import type { ResolvedWalineOptions } from './utils';
import type { Comment } from './typings';

import './styles/index.scss';

declare const VERSION: string;

export type WalineComponentOptions = Exclude<WalineOptions, 'el'>;

const WalineComponent = ({
  placeholder = 'Just Go Go.',
  path = location.pathname,
  avatar,
  avatarForce,
  avatarCDN,
  meta = ['nick', 'mail', 'link'],
  pageSize = 10,
  lang,
  langMode,
  locale = langMode,
  highlight,
  serverURL,
  emojiCDN,
  emojiMaps,
  requiredFields = [],
  copyRight = true,
  copyright = copyRight,
  uploadImage,
  anonymous,
  wordLimit = 0,
}: WalineComponentOptions): JSX.Element => (
  <Context
    anonymous={anonymous}
    lang={lang}
    locale={locale}
    emojiCDN={emojiCDN}
    emojiMaps={emojiMaps}
    avatar={avatar}
    avatarCDN={avatarCDN}
    avatarForce={avatarForce}
    uploadImage={uploadImage}
    wordLimit={wordLimit}
  >
    <App
      boxConfig={{
        serverURL,
        placeholder,
        meta,
        highlight,
        requiredFields,
        path,
      }}
      listConfig={{ path, pageSize, serverURL, avatar }}
      copyright={copyright}
    />
  </Context>
);

const Waline = (options: WalineOptions): void => {
  const root = checkInitOptions(options);

  const { path, serverURL } = options as ResolvedWalineOptions;

  // visitor count
  if (options.visitor) {
    const countIncrease = Visitor.post({ serverURL, path });

    const visitorElements = document.querySelectorAll(
      '.leancloud_visitors,.leancloud-visitors'
    );
    const countElements = (Array.from(
      visitorElements
    ) as HTMLElement[]).filter((el) => el.getAttribute('id'));

    const ids = countElements.map((el: Element) => {
      let id = el.getAttribute('id') || '';

      try {
        if (id) {
          id = decodeURI(id);
        }
      } catch (err) {
        // ignore error
      }

      return id;
    });

    const restIds = ids.filter((id) => id !== path);

    if (restIds.length) {
      const hasPath = restIds.length !== ids.length;

      void (hasPath ? countIncrease : Promise.resolve())
        .then(() => Visitor.get({ serverURL, paths: ids }))
        .then((counts) => Visitor.render(counts, countElements));
    } else {
      void countIncrease.then((count) => Visitor.render(count, countElements));
    }
  }

  // comment count
  const $counts = ([] as HTMLElement[]).filter.call(
    document.querySelectorAll('.waline-comment-count'),
    (element) => {
      if (!element.getAttribute('data-xid') && !element.getAttribute('id')) {
        return false;
      }
      if (element.innerText && element.innerText.trim()) {
        return false;
      }
      return true;
    }
  );

  if ($counts.length) {
    const paths = $counts.map((element: HTMLElement) => {
      let path =
        element.getAttribute('data-xid') || element.getAttribute('id') || '';

      try {
        path = decodeURI(path);
      } catch (err) {
        // ignore error
      }
      return path;
    });

    void fetchCount({ serverURL, paths }).then((counts) => {
      if (!Array.isArray(counts)) {
        counts = [counts];
      }

      $counts.forEach(
        (el, idx) => (el.innerText = (counts as number[])[idx].toString())
      );
    });
  }

  // mathml
  window.addEventListener('load', registMathML);

  if (root) {
    render(
      <React.StrictMode>
        <WalineComponent {...options} />
      </React.StrictMode>,
      root
    );
  }
};

WalineComponent.version = Waline.version = VERSION;

export interface RecentCommentsOptions {
  el: string;
  serverURL: string;
  count: number;
}

WalineComponent.Widget = Waline.Widget = {
  RecentComments({
    el,
    serverURL,
    count,
  }: RecentCommentsOptions): Promise<Comment[]> {
    // 评论列表展示
    const root = document.querySelector(el);

    if (!root) {
      return Promise.resolve([]);
    }

    return fetchRecent({ serverURL, count }).then((comments) => {
      if (comments.length) {
        root.innerHTML = `
      <ul class="waline-widget-list">
      ${comments
        .map(
          (comment) =>
            `<li class="waline-widget-item"><a href="${comment.url}">${comment.nick}</a>：${comment.comment}</li>`
        )
        .join('')}
      </ul>`;
      }

      return comments;
    });
  },
};

export default Waline;
