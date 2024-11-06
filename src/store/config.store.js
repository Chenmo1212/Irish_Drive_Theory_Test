import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useVersion = create(persist((set) => ({
  version: "1.0.0.240518",

  reset: () => set(() => ({version: "1.0.0.240518"})),

  update: (v) => set(() => ({version: v})),
}), {
  name: 'ddt-version'
}));


const EXPIRATION_TIME = 60 * 60 * 24;
const MAX_EXPIRATION_TIME = Number.MAX_SAFE_INTEGER;

export const useNotification = create(persist((set, get) => ({
  isNotification: true,
  expiration: Date.now() + EXPIRATION_TIME * 1000,

  reset: () => set(() => ({
    isNotification: true,
    expiration: Date.now()
  })),

  update: (bool, duration = EXPIRATION_TIME) => set(() => ({
    isNotification: bool,
    expiration: duration === 0 ? MAX_EXPIRATION_TIME : Date.now() + duration * 1000
  })),

  isExpired: () => {
    const currentTime = Date.now();
    return currentTime > get().expiration;
  }
}), {
  name: 'ddt-notification'
}));

export const useLang = create(persist((set) => ({
  isCN: false,

  update: (bool) => set(() => ({isCN: bool})),
}), {
  name: 'ddt-lang'
}));

export const useIntro = create(persist((set) => ({
  isHomeIntro: false,
  isMineIntro: false,

  update: (key, isIntroFinished) => set(() => ({[key]: isIntroFinished})),
}), {
  name: 'ddt-intro'
}));