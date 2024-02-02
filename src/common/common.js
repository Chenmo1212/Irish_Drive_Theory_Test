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