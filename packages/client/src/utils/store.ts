export type Comment = Record<string, unknown>;

const CACHE_KEY = 'ValineCache';

export const store = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem<T = any>(key: string): T | void {
    const commentString = localStorage.getItem(CACHE_KEY);

    if (!commentString) {
      return;
    }

    try {
      const result = JSON.parse(commentString) as Comment;

      return result[key] as T;
    } catch (err) {
      return;
    }
  },
  setItem(comment: Comment): void {
    localStorage.setItem(CACHE_KEY, JSON.stringify(comment));
  },
};
