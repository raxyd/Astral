function promptPassword() {
    const password = prompt('Please enter the password:');
    const correctPassword = 'cosmic123'; // Change this to your desired password

    if (password === correctPassword) {
        window.location.href = '/t'; // Change this to your desired redirect URL
    } else {
        alert('Incorrect password. Please try again.');
    }
}

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
