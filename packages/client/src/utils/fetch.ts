import type { Comment } from '../typings';

export interface FetchCountOptions {
  serverURL: string;
  paths: string[];
}

export const fetchCount = ({
  serverURL,
  paths,
}: FetchCountOptions): Promise<number | number[]> =>
  fetch(
    `${serverURL}/comment?type=count&url=${encodeURIComponent(paths.join(','))}`
  ).then((resp) => resp.json() as Promise<number | number[]>);

export interface FetchRecentOptions {
  serverURL: string;
  count: number;
}

export const fetchRecent = ({
  serverURL,
  count,
}: FetchRecentOptions): Promise<Comment[]> => {
  const url = `${serverURL}/comment?type=recent&count=${count}`;
  return fetch(url).then((resp) => resp.json() as Promise<Comment[]>);
};

export interface FetchListOptions {
  serverURL: string;
  path: string;
  page: string;
  pageSize: number;
}

export const fetchList = ({
  serverURL,
  path,
  page,
  pageSize,
}: FetchListOptions) => {
  const url = `${serverURL}/comment?path=${encodeURIComponent(
    path
  )}&pageSize=${pageSize}&page=${page}`;

  return fetch(url).then((resp) => resp.json());
};

export interface PostCommentOptions {
  serverURL: string;
  token: string;
  comment: Comment;
  pageSize: number;
}

export const postComment = ({
  serverURL,
  token,
  comment,
}: PostCommentOptions) => {
  const url = `${serverURL}/comment`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  }).then((resp) => resp.json());
};

export interface VisitCountOptions {
  serverURL: string;
  paths: string[];
}

export const fetchVisitCount = ({
  serverURL,
  paths,
}: VisitCountOptions): Promise<number[]> => {
  const url = `${serverURL}/article?path=${encodeURIComponent(
    paths.join(',')
  )}`;
  return fetch(url).then((resp) => resp.json() as Promise<number[]>);
};

export const postVisitCount = ({
  serverURL,
  path,
}: VisitCountOptions): Promise<number> => {
  const url = `${serverURL}/article`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  }).then((resp) => resp.json() as Promise<number>);
};
