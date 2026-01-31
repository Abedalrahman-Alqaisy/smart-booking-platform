const express = require('express');
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'university-project-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aboodaq7",
  database: "smart_booking"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// --- Authentication Routes ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            req.session.user = results[0];
            res.json({ message: 'Login successful', user: { id: results[0].id, username: results[0].username } });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

// --- Booking Routes ---
app.get('/api/bookings', (req, res) => {
    db.query('SELECT * FROM bookings ORDER BY booking_date DESC, booking_time DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/bookings', (req, res) => {
    const { customer_name, service_name, booking_date, booking_time } = req.body;

    // تحقق من تعارض الحجز
    db.query(
        'SELECT * FROM bookings WHERE booking_date = ? AND booking_time = ?',
        [booking_date, booking_time],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(409).json({ error: 'Conflict: This date and time is already booked.' });
            }

            // إضافة الحجز
            db.query(
                'INSERT INTO bookings (customer_name, service_name, booking_date, booking_time) VALUES (?, ?, ?, ?)',
                [customer_name, service_name, booking_date, booking_time],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ message: 'Booking created successfully', id: result.insertId });
                }
            );
        }
    );
});

app.put('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { customer_name, service_name, booking_date, booking_time } = req.body;

    // تحقق من تعارض الحجز قبل التحديث
    db.query(
        'SELECT * FROM bookings WHERE booking_date = ? AND booking_time = ? AND id != ?',
        [booking_date, booking_time, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(409).json({ error: 'Conflict: This date and time is already booked.' });
            }

            db.query(
                'UPDATE bookings SET customer_name = ?, service_name = ?, booking_date = ?, booking_time = ? WHERE id = ?',
                [customer_name, service_name, booking_date, booking_time, id],
                (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: 'Booking updated successfully' });
                }
            );
        }
    );
});

app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM bookings WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Booking deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
