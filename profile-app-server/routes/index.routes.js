const express = require('express');
const router = express.Router();
const authRouter = require('./auth.routes');
const userRouter = require('./users.routes');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/auth', authRouter);
router.use('/api', userRouter);

module.exports = router;
