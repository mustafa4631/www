export type Locale = "en" | "tr";
export const defaultLocale: Locale = "en";

export const getStoredLocale = (): Locale => {
  if (typeof window === "undefined") return defaultLocale;
  const locale = localStorage.getItem("locale");
  return (locale as Locale) || defaultLocale;
};

export const setStoredLocale = (locale: Locale): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
  }
};
