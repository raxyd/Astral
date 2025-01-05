const astronaut = document.getElementById('astronaut');
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

function getRandomPosition() {
    const randomX = Math.random() * (viewportWidth - 100);
    const randomY = Math.random() * (viewportHeight - 100);
    return { x: randomX, y: randomY };
}

function moveAstronaut() {
    const { x, y } = getRandomPosition();
    astronaut.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(checkIfOffScreen, 15000);
}

function checkIfOffScreen() {
    const rect = astronaut.getBoundingClientRect();
    if (rect.right < 0 || rect.left > viewportWidth || rect.bottom < 0 || rect.top > viewportHeight) {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                astronaut.style.top = `${Math.random() * viewportHeight}px`;
                astronaut.style.left = '-100px';
            } else {
                astronaut.style.top = '-100px';
                astronaut.style.left = `${Math.random() * viewportWidth}px`;
            }
            setTimeout(moveAstronaut, 0);
        }, 0);
    } else {
        moveAstronaut();
    }
}

moveAstronaut();
