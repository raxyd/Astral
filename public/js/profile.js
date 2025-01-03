document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});

function saveProfile() {
    const avatar = document.getElementById('avatar').src;
    const username = document.getElementById('username').textContent;
    const bio = document.getElementById('bio').value;
    const status = document.getElementById('status').value;

    const profile = {
        avatar,
        username,
        bio,
        status
    };

    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile saved!');
}

function loadProfile() {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
        document.getElementById('avatar').src = savedProfile.avatar;
        document.getElementById('username').textContent = savedProfile.username;
        document.getElementById('bio').value = savedProfile.bio;
        document.getElementById('status').value = savedProfile.status;
    }
}

document.getElementById('avatar-upload').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('avatar').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
});
