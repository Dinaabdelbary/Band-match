const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const saltRound = 10;


router.get('/login', (req, res) => {
    res.render('authview/login');
});

router.get('/signup', (req, res) => {
    res.render('authview/signup');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    bcryptjs.genSalt(saltRound)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hash => {
        
    })
});




router.get('/profile', (req, res) => {
    res.render('authview/profile');
});





module.exports = router;