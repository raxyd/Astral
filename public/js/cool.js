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

function addNewGame() {
    var gameIconURL = prompt("Enter the URL for the game icon:");
    var gameName = prompt("Enter the name of the game:");
    var gameURL = prompt("Enter the URL for the game:");

    if (gameIconURL && gameName && gameURL) {
        var gamesContainer = document.querySelector('.games-container');
        var newGameButton = document.createElement('div');
        newGameButton.className = 'game-button';

        var newGameLink = document.createElement('a');
        newGameLink.href = gameURL;

        var newGameImage = document.createElement('img');
        newGameImage.src = gameIconURL;
        newGameImage.alt = gameName + " Cover";

        newGameLink.appendChild(newGameImage);
        newGameButton.appendChild(newGameLink);
        gamesContainer.appendChild(newGameButton);
    } else {
        alert("All fields are required to add a new game.");
    }
}