export const APP_THEME_STORAGE_KEY = 'app-theme';

export const initTheme = (): void => {
  const stored = localStorage.getItem(APP_THEME_STORAGE_KEY);

  const theme =
    stored === 'light' || stored === 'dark'
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  document.documentElement.setAttribute('data-theme', theme);
};
