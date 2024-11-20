function promptPassword() {
    const password = prompt('Please enter the password:');
    const correctPassword = 'cosmic123'; // Change this to your desired password

    if (password === correctPassword) {
        window.location.href = '/t'; // Change this to your desired redirect URL
    } else {
        alert('Incorrect password. Please try again.');
    }
}
