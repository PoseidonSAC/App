const MAX_ITEMS = 50;

const safeParse = (raw: string | null): string[] => {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
};

export const getRecentOptions = (key: string): string[] => {
  try {
    return safeParse(localStorage.getItem(key));
  } catch {
    return [];
  }
};

export const addRecentOption = (key: string, value: string) => {
  const v = value.trim();
  if (!v) return;
  let items = getRecentOptions(key);
  items = [v, ...items.filter((x) => x.toLowerCase() !== v.toLowerCase())];
  if (items.length > MAX_ITEMS) items = items.slice(0, MAX_ITEMS);
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    // Log the error so empty catch blocks are avoided and failures can be diagnosed
    // eslint-disable-next-line no-console
    console.warn("Failed to save recent options to localStorage:", e);
  }
};
