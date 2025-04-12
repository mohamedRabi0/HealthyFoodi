const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { exec } = require('child_process');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log("📥 Incoming registration:", req.body);

    const user = new User(req.body);
    await user.save();
    console.log("✅ User saved:", user.email, user.username);

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    // Build the email command
    const emailCmd = `python3 scripts/send_email.py ${JSON.stringify(user.email)} ${JSON.stringify(user.username)}`;
    console.log("🚀 Running email script:", emailCmd);

    // Run the Python script
    exec(emailCmd, (err, stdout, stderr) => {
      if (err) {
        console.error('❌ Python email script failed:', err.message);
        console.error('stderr:', stderr);
        return;
      }
      console.log('📬 Email script response:\n', stdout);
    });

    res.status(201).send({ message: 'User created', token });

  } catch (err) {
    // Handle duplicate email or username errors
    if (err.code === 11000 && err.keyPattern) {
      const duplicateFields = Object.keys(err.keyPattern).join(', ');
      return res.status(400).send({ error: `${duplicateFields} already in use` });
    }

    console.error('❌ Registration failed:', err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});
// LOGIN
router.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send({ error: 'Email, username, and password are required' });
  }

  const user = await User.findOne({ email, username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '1d',
  });

  res.send({ token });
});


module.exports = router;
