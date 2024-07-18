require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // or '*' to allow all origins
  credentials: true,
}));

const pool = new Pool({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'reservation_db',
  password: process.env.DATABASE_PASSWORD || '', // Add your PostgreSQL password here if you have one
  port: process.env.DATABASE_PORT || 5432,
});

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        reservation_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL
      );
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initializeDatabase();

const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('adminpass', 8), role: 'admin' },
  { id: 2, username: 'user', password: bcrypt.hashSync('userpass', 8), role: 'user' },
];

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token is required');
  }
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.user = decoded;
    next();
  });
};

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send('Permission denied');
  }
  next();
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

app.post('/search', (req, res) => {
  const { query } = req.body;
  const students = [
    { id: 1, branch: 'CS', name: 'John Doe', class: '10A', stream: 'Science' },
    { id: 2, branch: 'CS', name: 'Jane Doe', class: '10B', stream: 'Commerce' },
  ];
  const results = students.filter(student =>
    student.name.includes(query) || student.id.toString().includes(query)
  );
  res.json(results);
});

app.get('/admin', verifyToken, checkRole('admin'), (req, res) => {
  res.send('Welcome to the admin dashboard');
});

app.get('/user', verifyToken, checkRole('user'), (req, res) => {
  res.send('Welcome to the user dashboard');
});

// Create a reservation
app.post('/reservations', async (req, res) => {
  const { user_id, first_name, last_name, reservation_date, status } = req.body;
  if (!user_id || !first_name || !last_name || !reservation_date || !status) {
    return res.status(400).json({ error: 'Please provide user_id, first_name, last_name, reservation_date, and status' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO reservations (user_id, first_name, last_name, reservation_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, first_name, last_name, reservation_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reservations
app.get('/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
