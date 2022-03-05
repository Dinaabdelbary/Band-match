
const router = require("express").Router();
const Band = require('../models/Band.model.js')

router.get('/list', (req, res) => {
    Band.find()
        .then(bandsFromDb => {
            res.render('lists/bandProfile.hbs',{
                band: bandsFromDb
            });
        }).catch(error => console.log(error))
});

    router.get('/match', (req, res) => {
        res.render('lists/bandProfile.hbs')
    });

module.exports = router;