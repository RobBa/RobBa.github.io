function toggleDarkMode() {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const btn = document.getElementById('dark-mode-btn');
    if (!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.querySelector('i').className = isDark ? 'bi bi-sun' : 'bi bi-moon-stars-fill';
}

document.addEventListener('DOMContentLoaded', updateDarkModeIcon);
