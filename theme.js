(function () {
  const STORAGE_KEY = 'bluum-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const THEME_IMAGES = [
    { selector: '.nav-logo img', light: 'images/logo.png', dark: 'images/logo-dark.png' },
    { selector: '.side-nav-flower img', light: 'images/flower-icon.png', dark: 'images/flower-icon-dark.png' },
  ];

  function updateThemeImages(theme) {
    THEME_IMAGES.forEach(({ selector, light, dark }) => {
      document.querySelectorAll(selector).forEach(img => {
        img.src = theme === 'dark' ? dark : light;
      });
    });
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateThemeImages(theme);
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
    }
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  if (!root.getAttribute('data-theme')) {
    applyTheme(getPreferredTheme());
  } else {
    updateThemeImages(root.getAttribute('data-theme'));
    if (toggle) {
      const theme = root.getAttribute('data-theme');
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
    }
  }

  if (toggle) toggle.addEventListener('click', toggleTheme);
})();
