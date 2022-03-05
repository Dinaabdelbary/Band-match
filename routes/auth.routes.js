const mongoose = require('mongoose');
const router = require('express').Router();
const bcryptjs = require('bcryptjs');

const Musician = require('../models/Musician.model')

const saltRounds = 10;

////////////Sign up//////////////////
router.get('/auth/signup', (req, res) => {
    res.render('authview/signup');
});

router.post('/auth/signup', (req, res) => {
    // console.log(req.body);
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
        res.render('authview/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
      }

    bcryptjs
       .genSalt(saltRounds)
       .then(salt => bcryptjs.hash(password, salt))
       .then(hashedPassword => {
        // console.log(hashedPassword);
        return Musician.create({
            username,
            email,
            password: hashedPassword
        })
      })
      .then(musicianFrDB => {
            // console.log(musicianFrDB)
            res.redirect('/')  // might redirect to other page
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('authview/signup', { errorMessage: error.message });
        
        } else if (error.code === 11000) {
            res.status(500).render('authview/signup', {
                errorMessage: 'Username and email need to be unique. Either username or email is already used.'
            })
        } else {
          console.log(error)
        }
    });

    
});

//////////////LogIn///////////////
router.get('/auth/login', (req, res) => {
    res.render('authview/login');
});

router.post('/auth/login', (req, res) =>{
    console.log("=====>",req.session)
    const { username, password } = req.body

    if (username === '' || password === '') {
        res.render('authview/login', {
          errorMessage: 'Please enter both, username and password to login.'
        });
        return;
      }
      Musician.findOne({username})
              .then(musician => {
                  console.log(musician)
                if (!musician) {
                    res.render('authview/login', { errorMessage: 'Username is not registered. Try with other username.' });
                    return;
                  } else if (bcryptjs.compareSync(password, musician.password)) {
                      req.session.currentUser = musician
                    res.redirect('/');
                  } else {
                    res.render('authview/login', { errorMessage: 'Incorrect password.' });
                  }
              })
              .catch(error => {
                  console.log(error)
              });
})

router.post('/logout', (req, res)=>{
    req.session.destroy(error =>{
        if(error){
            console.log(error)
        } else {
            res.redirect('/')
        }
    })
})


router.get('/profile', (req, res) => {
    res.render('authview/profile');
});





module.exports = router;