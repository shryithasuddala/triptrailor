// utils/storage.js

export const getData = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Error parsing", key, error);
    return defaultValue;
  }
};

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};