const mongoose = require('mongoose');
const router = require('express').Router();
const bcryptjs = require('bcryptjs');

const Band = require('../models/Band.model')

const saltRounds = 10;

router.get('/auth/bandsignup', (req, res) => {
    res.render('authview/bandsignup');
});

router.post('/auth/bandsignup', (req, res) => {
    // console.log(req.body);
    const { bandname, password, email } = req.body;

    if (!bandname || !email || !password) {
        res.render('authview/bandsignup', { errorMessage: 'All fields are mandatory. Please provide your bandname, email and password.' });
        return;
      }

      bcryptjs
       .genSalt(saltRounds)
       .then(salt => bcryptjs.hash(password, salt))
       .then(hashedPassword => {
        // console.log(hashedPassword);
        return Band.create({
            bandname,
            email,
            password: hashedPassword
        })
      })
      .then(bandFrDB => {
        // console.log(musicianFrDB)
        req.session.currentUser = bandFrDB
        res.redirect('/')  // might redirect to other page
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('authview/bandsignup', { errorMessage: error.message });
    
    } else if (error.code === 11000) {
        res.status(500).render('authview/bandsignup', {
            errorMessage: 'bandname and email need to be unique. Either band name or email is already used.'
        })
    } else {
      console.log(error)
    }
});

});

router.get('/auth/bandlogin', (req, res) => {
    res.render('authview/bandlogin');
});

router.post('/auth/bandlogin', (req, res) =>{
    console.log("=====>",req.session)
    const { bandname, password } = req.body

    if (bandname === '' || password === '') {
        res.render('authview/bandlogin', {
          errorMessage: 'Please enter both, bandname and password to login.'
        });
        return;
      }
      Band.findOne({bandname})
              .then(band => {
                  console.log(band)
                if (!band) {
                    res.render('authview/bandlogin', { errorMessage: 'bandname is not registered. Try with other bandname.' });
                    return;
                  } else if (bcryptjs.compareSync(password, band.password)) {
                      req.session.currentUser = band
                    res.redirect('/');
                  } else {
                    res.render('authview/bandlogin', { errorMessage: 'Incorrect password.' });
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

module.exports = router;