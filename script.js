// Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const burger = document.getElementById('burger');
const nav = document.getElementById('navbar');
const body = document.body;

// ========== Load Dark Mode from localStorage ==========
window.onload = () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
    darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }

  // AOS initialization
  AOS.init();
};

// ========== Toggle Dark Mode ==========
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  darkModeToggle.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
});

// ========== Burger Menu Toggle ==========
burger.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// ========== Close Burger Menu on Link Click ==========
document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show');
  });
});
