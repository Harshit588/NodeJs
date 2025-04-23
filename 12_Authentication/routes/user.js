const express = require('express');
const { userSignUp, userLogin } = require('../controllers/user');
const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup', userSignUp);

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', userLogin);

module.exports = router