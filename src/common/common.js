export const IS_UPDATED_QUESTIONS = false;
export const NEW_VERSION = "1.2.7.240204";
export const DEFAULT_VERSION = "1.0.0.240202";
export const THEME_COLOR = "rgb(83, 109, 254)"
export const ERROR_COLOR = "rgb(245, 108, 108)"
export const OPTION_LABELS = ['A', "B", "C", "D"]

export const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) return JSON.parse(storedValue);
  else {
    saveToLocalStorage(key, defaultValue);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const compareVersions = (version1, version2) => version1.localeCompare(version2);

export const updateDataIfNewVersion = (currentVersion, newVersion) => {
  if (compareVersions(currentVersion, newVersion) < 0) {
    saveToLocalStorage('appVersion', newVersion);
    return true;
  }
  return false;
};