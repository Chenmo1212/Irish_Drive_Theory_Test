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