
function saveQuests() {
    const quest1 = document.getElementById('quest1').checked;
    const quest2 = document.getElementById('quest2').checked;
    localStorage.setItem('quest1', quest1);
    localStorage.setItem('quest2', quest2);
}


function loadQuests() {
    const quest1 = localStorage.getItem('quest1') === 'true';
    const quest2 = localStorage.getItem('quest2') === 'true';
    document.getElementById('quest1').checked = quest1;
    document.getElementById('quest2').checked = quest2;
}

function checkQuestsByPath() {
    const path = window.location.pathname;
    if (path.includes('g/basketball-stars/basketball-stars-main/index.html')) {
        document.getElementById('quest1').checked = true;
    } else if (path.includes('g/basket-random/basket-random-main/index.html')) {
        document.getElementById('quest2').checked = true;
    }
    saveQuests(); // Save the checked state to local storage
}

// Load and check quests on page load
window.onload = function() {
    loadQuests();
    checkQuestsByPath();
}