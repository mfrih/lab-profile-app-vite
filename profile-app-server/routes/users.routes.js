const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

// get all users
router.get('/users', async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error('Error when retrieving users', error);
  }
});

// upload a picture

//update a user
// router.put('/users/:userId', async (req, res, next) => {
//     try {
//         const userId = req.params.userId
//         const
//     } catch (error) {

//     }

module.exports = router;
