function previewAvatar() {
    const avatar = document.getElementById('avatar').files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById('avatarPreview').src = reader.result;
    };
    if (avatar) {
        reader.readAsDataURL(avatar);
    }
}

function saveProfile() {
    const avatar = document.getElementById('avatar').files[0];
    const background = document.getElementById('background').value;
    const avatarPreview = document.getElementById('avatarPreview');

    function saveToLocalStorage(avatarData) {
        const profile = {
            avatar: avatarData,
            background: background
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        console.log('Profile saved:', profile);
        alert('Profile saved successfully!');
    }

    if (avatar) {
        const reader = new FileReader();
        reader.onloadend = function() {
            saveToLocalStorage(reader.result);
        };
        reader.readAsDataURL(avatar);
    } else {
        saveToLocalStorage(avatarPreview.src);
    }
}
function saveProfile() {
    const avatar = document.getElementById('avatar').files[0];
    const background = document.getElementById('background').value;
    const reader = new FileReader();//-
    reader.onloadend = function() {//-
        const avatarData = reader.result;//-
    const avatarPreview = document.getElementById('avatarPreview');//+
//+
    function saveToLocalStorage(avatarData) {//+
        const profile = {
            avatar: avatarData,
            background: background
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        console.log('Profile saved:', profile);
        alert('Profile saved successfully!');
    };//-
    }//+
    if (avatar) {
        const reader = new FileReader();//+
        reader.onloadend = function() {//+
            saveToLocalStorage(reader.result);//+
        };//+
        reader.readAsDataURL(avatar);
    } else {
        const profile = {//-
            avatar: document.getElementById('avatarPreview').src,//-
            background: background//-
        };//-
        localStorage.setItem('userProfile', JSON.stringify(profile));//-
        console.log('Profile saved without new avatar:', profile); // Debug statement//-
        alert('Profile saved successfully!');//-
        saveToLocalStorage(avatarPreview.src);//+
    }
}

function loadProfile() {
    try {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        if (profile) {
            const backgroundElement = document.getElementById('background');
            const avatarPreviewElement = document.getElementById('avatarPreview');

            if (backgroundElement && profile.background) {
                backgroundElement.value = profile.background;
            }

            if (avatarPreviewElement && profile.avatar) {
                avatarPreviewElement.src = profile.avatar;
            } else {
                avatarPreviewElement.src = 'path/to/default/avatar.png'; // Replace with your default avatar path
            }

            console.log('Profile loaded:', profile);
        } else {
            console.log('No profile found in localStorage');
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        // Optionally, you can show an error message to the user
        // alert('An error occurred while loading your profile. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', loadProfile);
