const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load the theme from localStorage on page load
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
};

// Toggle theme on button click
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    const isDark = body.classList.contains('dark-mode');

    // Update localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Change icon and label
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    darkModeToggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
});
