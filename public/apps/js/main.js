document.addEventListener('DOMContentLoaded', () => {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const randomPosition = Math.random();
        bubble.style.setProperty('--random-position', randomPosition);
    });
});