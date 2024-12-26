// Initialize AOS Library
AOS.init();

// Light/Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    localStorage.setItem('theme', newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', storedTheme);
    themeToggle.textContent = storedTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});
