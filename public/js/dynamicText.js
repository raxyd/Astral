const words = ["Stellar.", "the Best Website Ever.", "the Haven for Unblocked Games."];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
let delay = 150;

const type = () => {
    const dynamicText = document.getElementById("dynamic-text");

    if (!isDeleting) {
        currentWord = words[i].substring(0, j + 1);
        dynamicText.innerHTML = currentWord + '<span id="cursor">|</span>';
        j++;

        if (j === words[i].length) {
            isDeleting = true;
            delay = 2000;
        } else {
            delay = 150;
        }
    } else {
        currentWord = words[i].substring(0, j - 1);
        dynamicText.innerHTML = currentWord + '<span id="cursor">|</span>';
        j--;

        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            delay = 500;
        } else {
            delay = 100;
        }
    }

    setTimeout(type, delay);
};

document.addEventListener("DOMContentLoaded", () => {
    type();
});
