// Save value
export function setLocalStorage(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error("localStorage set error:", error);
  }
}

// Get value
export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("localStorage get error:", error);
    return defaultValue;
  }
}

// Remove key
export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("localStorage remove error:", error);
  }
}

// Clear all
export function clearLocalStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("localStorage clear error:", error);
  }
}
