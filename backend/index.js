const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

// Temporary user data for demonstration
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('adminpass', 8), role: 'admin' },
  { id: 2, username: 'user', password: bcrypt.hashSync('userpass', 8), role: 'user' }
];

// Middleware to verify token and extract user information
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

// Middleware to check if the user has the required role
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

// Protected route example
app.get('/admin', verifyToken, checkRole('admin'), (req, res) => {
  res.send('Welcome to the admin dashboard');
});

app.get('/user', verifyToken, checkRole('user'), (req, res) => {
  res.send('Welcome to the user dashboard');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
