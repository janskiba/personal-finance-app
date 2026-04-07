export const initTheme = (): void => {
  const key = 'app-theme';
  const stored = localStorage.getItem(key);

  const theme =
    stored === 'light' || stored === 'dark'
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  document.documentElement.setAttribute('data-theme', theme);
};
