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

export const useNotification = create(persist((set, get) => ({
  isNotification: true,
  expiration: Date.now() + EXPIRATION_TIME * 1000,

  update: (bool) => set(() => ({
    isNotification: bool,
    expiration: Date.now() + EXPIRATION_TIME * 1000
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