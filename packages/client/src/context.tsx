import React, { useState } from 'react';
import {
  defaultEmojiCDN,
  defaultEmojiMaps,
  defaultGravatarSetting,
  defaultLang,
  defaultUploadImage,
  locales,
} from './config';

import type {
  Avatar,
  EmojiMaps,
  Locale,
  Locales,
  UploadImage,
  WalineOptions,
} from './config';

const USER_KEY = 'WALINE_USER';

export type ContextOptions = Pick<
  WalineOptions,
  | 'anonymous'
  | 'lang'
  | 'locale'
  | 'emojiCDN'
  | 'emojiMaps'
  | 'avatar'
  | 'avatarCDN'
  | 'avatarForce'
  | 'uploadImage'
  | 'wordLimit'
>;

export interface UserInfo {
  nick: string;
  mail: string;
}

export interface ContextType {
  locales: Locales;
  locale: Locale;
  lang: string;
  wordLimit: [number, number] | false;
  emojiCDN: string;
  emojiMaps: EmojiMaps;
  gravatarSetting: {
    cdn: string;
    ds: string[];
    params: string;
  };
  uploadImage: UploadImage;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  anonymous?: boolean;
}

export const ConfigContext = React.createContext<ContextType>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({} as unknown) as any
);

const Context = (
  props: ContextOptions & { children: JSX.Element }
): JSX.Element => {
  let storageUserInfo: UserInfo;

  const locale = {
    ...(locales[props.lang as string] || locales[defaultLang]),
    ...(typeof props.locale === 'object' ? props.locale : {}),
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    storageUserInfo = JSON.parse(
      localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY) || ''
    ) || { nick: '', mail: '' };
  } catch (err) {
    // catch
    storageUserInfo = { nick: '', mail: '' };
  }

  const [userInfo, setUserInfo] = useState<UserInfo>(storageUserInfo);

  const context: ContextType = {
    locales,
    locale,
    lang: props.lang || defaultLang,
    wordLimit: Array.isArray(props.wordLimit)
      ? props.wordLimit
      : props.wordLimit
      ? [0, props.wordLimit]
      : false,
    emojiCDN: props.emojiCDN || defaultEmojiCDN,
    emojiMaps: props.emojiMaps || defaultEmojiMaps,
    gravatarSetting: {
      cdn: props.avatarCDN || defaultGravatarSetting.cdn,
      ds: defaultGravatarSetting.ds,
      params: `?d=${
        defaultGravatarSetting.ds.includes(props.avatar as string)
          ? (props.avatar as Avatar)
          : 'mp'
      }${
        props.avatarForce ? `&q=${Math.random().toString(32).substring(2)}` : ''
      }`,
    },
    uploadImage:
      typeof props.uploadImage === 'function'
        ? props.uploadImage
        : defaultUploadImage,
    anonymous: props.anonymous,
    userInfo,
    setUserInfo,
  };

  return (
    <ConfigContext.Provider value={context}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export default Context;
