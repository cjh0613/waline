export interface Comment {
  nick: string;
  mail: string;
  url: string;
  comment: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}
