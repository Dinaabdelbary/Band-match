const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('authviews/login');
});

router.get('/signup', (req, res) => {
    res.render('authviews/signup');
});

module.exports = router;