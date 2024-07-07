const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

// Temporary user data for demonstration
const users = [{ id: 1, username: 'testuser', password: bcrypt.hashSync('wBtl50r', 10) }];

app.post('/login', (req, res) => {
    const { username, password} = req.body;
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.status(400).send('User not found');
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id}, 'screctkey', {expiresIn: '1h'});
    res.json({ token });
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});