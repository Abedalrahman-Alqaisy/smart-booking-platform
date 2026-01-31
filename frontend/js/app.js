const API_URL = 'http://localhost:3000/api';
let bookings = [];

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('user-display').textContent = `Welcome, ${user.username}`;
    loadBookings();
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Load Bookings
async function loadBookings() {
    try {
        const response = await fetch(`${API_URL}/bookings`);
        bookings = await response.json();
        renderTable();
    } catch (error) {
        showAlert('Error loading bookings', 'danger');
    }
}

function renderTable() {
    const tbody = document.getElementById('booking-table-body');
    tbody.innerHTML = '';
    bookings.forEach(booking => {
        // Format date to readable string
        const date = new Date(booking.booking_date).toLocaleDateString();
        tbody.innerHTML += `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.customer_name}</td>
                <td>${booking.service_name}</td>
                <td>${date}</td>
                <td>${booking.booking_time}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editBooking(${booking.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBooking(${booking.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Save Booking (Add or Update)
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('booking-id').value;
    const bookingData = {
        customer_name: document.getElementById('customer_name').value,
        service_name: document.getElementById('service_name').value,
        booking_date: document.getElementById('booking_date').value,
        booking_time: document.getElementById('booking_time').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/bookings/${id}` : `${API_URL}/bookings`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert(data.message, 'success');
            bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
            loadBookings();
        } else {
            showAlert(data.error, 'danger');
        }
    } catch (error) {
        showAlert('Error saving booking', 'danger');
    }
});

function editBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        document.getElementById('modalTitle').textContent = 'Edit Booking';
        document.getElementById('booking-id').value = booking.id;
        document.getElementById('customer_name').value = booking.customer_name;
        document.getElementById('service_name').value = booking.service_name;
        // Format date for input[type="date"] (YYYY-MM-DD)
        const date = new Date(booking.booking_date).toISOString().split('T')[0];
        document.getElementById('booking_date').value = date;
        document.getElementById('booking_time').value = booking.booking_time;
        new bootstrap.Modal(document.getElementById('bookingModal')).show();
    }
}

async function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        try {
            const response = await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (response.ok) {
                showAlert(data.message, 'success');
                loadBookings();
            } else {
                showAlert(data.error, 'danger');
            }
        } catch (error) {
            showAlert('Error deleting booking', 'danger');
        }
    }
}

function resetForm() {
    document.getElementById('modalTitle').textContent = 'Add New Booking';
    document.getElementById('booking-id').value = '';
    document.getElementById('booking-form').reset();
}

function showAlert(message, type) {
    const container = document.getElementById('alert-container');
    container.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}
