
const router = require("express").Router();
const Musician = require("../models/Musician.model.js");
const fileUploader = require('../config/cloudinary.config')

router.get('/musicianProfile', (req, res) => {
    const currentUserID = req.session.currentUser._id
    Musician.findById(currentUserID)
        .then(musiciansFromdb => {
            console.log("0000000000000000000000",musiciansFromdb)
            res.render('lists/musicianProfile.hbs', {
                musician: musiciansFromdb
            });
        }).catch(error => console.log(error))
});

router.get('/profile', (req, res) => {
    res.render('authview/profile');
});

router.post('/edit/:id', fileUploader.single('image'), (req, res) => {
    const {id} = req.params
    const { username, instruments, mediaLinks, genres, description } = req.body
    console.log('post here',instruments,)
    const newInstruments  = instruments.split(" ");
    const newMediaLinks = mediaLinks.split(" ");
    const newGenres = genres.split(" ");
    const newDescription = description.split(" ");

    Musician.findOneAndUpdate({_id: id}, { username, instruments :newInstruments, mediaLinks : newMediaLinks, genres : newGenres, description : newDescription, imageUrl: req.file?.path })
        .then(createdMusicainFrDB => {
            console.log(createdMusicainFrDB)
            res.redirect('/musicians/musicianProfile')
        })
        .catch(error => console.log(error))
})

module.exports = router;