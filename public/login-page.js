document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Example: send login data to server
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                if (response.ok) {
                    // Redirect or show success
                    window.location.href = '/dashboard';
                } else {
                    // Show error message
                    alert(result.message || 'Login failed');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }
});