const express = require('express');
const {loadToken, signup, login} = require('../controller/auth');

const router = express.Router();

router.get('/loadToken', loadToken);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
