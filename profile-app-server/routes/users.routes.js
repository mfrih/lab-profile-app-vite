const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const uploader = require('../config/cloudinary.config');

// get all users
router.get('/users', async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error when retrieving users', error);
  }
});

// upload a picture
router.post('/upload', uploader.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file!!!!!' });
    }
    const uploadedImageURL = req.file.path;
    res.status(200).json(uploadedImageURL);
  } catch (error) {
    next(error);
  }
});

//update a user

router.put('/users/:userId', async (req, res, next) => {
  try {
    const userIdValue = req.params.userId;
    const newImageURL = req.body.image;

    const updatedUser = await User.findByIdAndUpdate(
      userIdValue,
      { image: newImageURL },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {}
});

module.exports = router;
