import { fetchVisitCount, postVisitCount } from './fetch';

import type { VisitCountOptions } from './fetch';

export const Visitor = {
  post({ serverURL, path }: VisitCountOptions) {
    if (!serverURL || !path) {
      return null;
    }

    return postVisitCount({ serverURL, path });
  },

  get({ serverURL, paths }: { serverURL: string; paths: string[] }) {
    if (!paths.length) {
      return;
    }

    return fetchVisitCount({ serverURL, path: paths.join() });
  },

  render(counts: string[] | string, countElements: HTMLElement[]): void {
    if (!Array.isArray(counts)) {
      counts = new Array(countElements.length).fill(counts);
    }

    countElements.forEach((el, idx) => {
      let counterEl = el.querySelector(
        '.leancloud-visitors-count'
      ) as HTMLElement;

      if (!counterEl) {
        counterEl = el;
      }

      counterEl.innerText = (counts as string[])[idx];
    });
  },
};
