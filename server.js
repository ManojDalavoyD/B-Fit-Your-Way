// ----------- server.js -----------
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2131',
  database: 'users',
  port: '3306'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from /public

// Routes
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Missing fields');
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Database error');
    }

    console.log('User registered with ID:', result.insertId);
    res.status(200).send('Signup successful!');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      res.status(200).send('Login successful!');
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});