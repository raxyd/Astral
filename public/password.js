function promptPassword() {
    const password = prompt('Please enter the password:');
    const correctPassword = 'cosmic123'; // Change this to your desired password

    if (password === correctPassword) {
          localStorage.setItem('quest3', 'true');
    } else {
        alert('Incorrect password. Please try again.');
    }
}
