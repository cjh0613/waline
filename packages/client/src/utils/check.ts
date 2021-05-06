import type { WalineOptions } from '../config';

export const checkInitOptions = (options: WalineOptions): Element | false => {
  const { el, serverURL } = options;

  if (!el) throw new Error("Required option 'el' is missing!");

  // check serverURL
  if (serverURL) {
    // remove ending slash
    options.serverURL = serverURL.replace(/\/$/, '');
  } else {
    throw new Error("Required option 'serverURL' is missing!");
  }

  // set default path and encode it
  if (!options.path) {
    options.path = location.pathname;
  }
  try {
    options.path = decodeURI(options.path);
  } catch (err) {
    // ignore error
  }

  // check root element
  const root = document.querySelector(el);

  if (!root) throw new Error("Option 'el' is invalid!");

  return root;
};

export interface ResolvedWalineOptions extends WalineOptions {
  path: string;
}
