const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../config/isAuthenticated');

// ! everything is prefixed with /auth //

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, campus, course } = req.body;
    // check for empty fields
    if (!username || !password || !campus || !course) {
      return res
        .status(400)
        .json({ message: 'All these fields are mandatory for signup' });
    }
    // check if username already exists
    const usernameExisting = await User.findOne({ username: username });
    if (usernameExisting) {
      return res.status(400).json({ message: 'This username already exists' });
    }
    // hash the password using jwt
    const hashedPassword = await bcrypt.hash(password, 12);
    // create the signed-up user
    const signedUpUser = await User.create({
      username,
      password: hashedPassword,
      campus,
      course,
    });
    return res.status(201).json(signedUpUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //check for empty fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'All these fields are mandatory for login' });
    }
    //find the user by their username
    const currentUser = await User.findOne({ username }).select(
      'username password'
    );
    if (!currentUser) {
      return res.status(400).json({ message: 'This user does not exist' });
    }
    // check if the password matches the one in the DB
    const matchingPassword = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!matchingPassword) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    // generate auth token
    const token = jwt.sign({ _id: currentUser._id }, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
    });
    res.status(202).json({ authToken: token });
  } catch (error) {
    next(error);
  }
});

// route used to verify the user's authentication status and retrieves their user object for further processing
router.get('/verify', isAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
