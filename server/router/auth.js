const express = require('express');
const router = express.Router();
const UsersData = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.status(200).send({ data: 'hello' });
});

// user registration
router.post('/register', async (req, res) => {
  const { username, fullname, email, password } = req.body;

  if (!username || !fullname || !email || !password) {
    return res
      .status(422)
      .json({ error: 'Please fill all the fields properly' });
  }

  try {
    const isUsernameExist = await UsersData.findOne({ username: username });

    if (isUsernameExist) {
      return res
        .status(422)
        .json({ error: 'Registration failed, username already exists' });
    }

    const isEmailExist = await UsersData.findOne({ email: email });
    if (isEmailExist) {
      return res
        .status(422)
        .json({ error: 'Registration failed, Email already exists' });
    }

    const newUser = new UsersData(req.body);
    await newUser.save();

    if (newUser) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(500).json({ error: 'Failed to registered' });
    }
  } catch (err) {
    console.log('error');
    res.status(500).json({ error: 'Sorry! something went wrong' });
  }
});

// user login
router.post('/login', async (req, res) => {
  const { email, username, phoneNumber, password } = req.body;

  const loginBy = email
    ? ['email', email]
    : username
    ? ['username', username]
    : phoneNumber
    ? ['phoneNumber', phoneNumber]
    : null;

  if (!loginBy[1] || !password) {
    return res
      .status(400)
      .json({ error: 'Please fill all the fields properly' });
  }

  const user = await UsersData.findOne({ [loginBy[0]]: [loginBy[1]] });
  if (!user) {
    res.status(400).json({
      error:
        "The username you entered doesn't belong to an account. Please check your username and try again.",
    });
  } else {
    const isPassMatch = await bcrypt.compare(password, user.password);

    const token = await user.generateAuthToken();

    // res.cookie(name,value, {options(e.g. expires)})
    res.cookie('instajwtoken', token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (!isPassMatch) {
      res.status(400).json({
        error:
          'Sorry, your password was incorrect. Please double-check your password.',
      });
    } else {
      user.password = null;
      user.tokens = null;
      res.json({ message: 'User login successsfully', data: user });
    }
  }
});

module.exports = router;
