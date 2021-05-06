import { fetchVisitCount, postVisitCount } from './fetch';

export const Visitor = {
  post: postVisitCount,

  get({ serverURL, paths }: { serverURL: string; paths: string[] }) {
    if (!paths.length) {
      return;
    }

    return fetchVisitCount({ serverURL, path: paths.join() });
  },

  render(counts: number[] | number, countElements: HTMLElement[]): void {
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

      counterEl.innerText = (counts as number[])[idx].toString();
    });
  },
};
