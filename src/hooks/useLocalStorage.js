import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // ignore write errors (private browsing quota)
    }
    setStoredValue(valueToStore);
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValue];
}
