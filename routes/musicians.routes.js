


const router = require("express").Router();
const Musician = require("../models/Musician.model.js");

router.get('/list', (req, res) => {
    Musician.find()
        .then(musiciansFromdb => {
            res.render('lists/musicianlist.hbs', {
                musicians: musiciansFromdb
            });
        }).catch(error => console.log(error))
});

router.get('/match', (req, res) => {
    res.render('lists/musicianlist.hbs')
});

module.exports = router;