const weeklyChallenges = [
    "Get Every Quest Finished!",
    "Get Every Random Message on homescreen and screenshot it, show to admin in server."
];

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

function loadCurrentChallenge() {
    const currentWeek = getWeekNumber(new Date());
    const challengeIndex = currentWeek % weeklyChallenges.length;
    const currentChallenge = weeklyChallenges[challengeIndex];
    document.getElementById('current-challenge').innerText = currentChallenge;
}

function completeChallenge() {
    alert("Congratulations! You've completed the challenge.");
}

document.addEventListener('DOMContentLoaded', function() {
    loadCurrentChallenge();
});
