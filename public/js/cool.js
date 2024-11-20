window.addEventListener('scroll', function() {
    const overlay = document.querySelector('.overlay');
    const scrollTop = window.scrollY;
    
    overlay.style.top = scrollTop + 'px';
});

function switchTheme(theme) {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('green-theme', 'blue-theme', 'red-theme', 'pink-theme', 'black-theme', 'white-theme', 'yellow-theme');
    
    // Add the new theme class
    body.classList.add(`${theme}-theme`);
}

// Example: Switch to green theme
switchTheme('green');
