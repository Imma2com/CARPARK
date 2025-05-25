const express = require('express');
const cors = require('cors');
const path = require('path');
const { createRequire } = require('module');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Hardcoded users
const users = [
  { username: 'admin', password: '1234', role: 'admin' },
  { username: 'attendant', password: '4321', role: 'attendant' }
];

// Simple login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, username: user.username, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
