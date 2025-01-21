document.addEventListener("DOMContentLoaded", function() {
    document.body.style.display = "none"; // Hide the document body initially
    
    const password = "yes"; // Replace with your password
    
    const userInput = prompt("Enter the password:");
    if (userInput !== password) {
        const script = document.createElement('script');
        script.src = 'access-denied.js'; // The script file to refer if the password is incorrect
        document.head.appendChild(script);
    } else {
        document.body.style.display = "block"; // Show the body only if the password is correct
    }
});
