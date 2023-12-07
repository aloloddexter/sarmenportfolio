
document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var loginButton = document.getElementById('loginButton');
    
    var attempts = 3; // Set the maximum number of login attempts
    
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (attempts > 0) {
            // Send the form data to the server for validation
            var formData = new FormData(loginForm);
            fetch('login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Assuming the server returns JSON
            .then(data => {
                if (data.success) {
                    // Redirect to the appropriate page on successful login
                    window.location.href = data.redirect;
                } else {
                    // Decrement the login attempts and display an error message
                    attempts--;
                    alert('Invalid username or password. ' + attempts + ' attempts remaining.');
                    if (attempts === 0) {
                        // Disable the form and login button after 3 failed attempts
                        usernameInput.disabled = true;
                        passwordInput.disabled = true;
                        loginButton.disabled = true;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
