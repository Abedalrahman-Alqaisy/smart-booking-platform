const API_URL = 'http://localhost:3000/api';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const alertContainer = document.getElementById('alert-container');

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            alertContainer.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        }
    } catch (error) {
        alertContainer.innerHTML = `<div class="alert alert-danger">Error connecting to server</div>`;
    }
});
