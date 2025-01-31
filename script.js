const themeSwitch = document.getElementById('theme-switch');
const themeLabel = document.getElementById('theme-label');


// Cambia tema al toggle
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
        themeLabel.textContent = 'Modo Chiaro';
    } else {
        document.body.classList.remove('dark-mode');
        themeLabel.textContent = 'Modo Scuro';
    }
});
