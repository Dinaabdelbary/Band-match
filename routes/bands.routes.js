
const router = require("express").Router();
const Band = require('../models/Band.model.js')
const fileUploader = require('../config/cloudinary.config')

router.get('/bandProfile', (req, res) => {
    const currentUserID = req.session.currentUser._id
    Band.findById(currentUserID)
        .then(bandsFromDb => {
            console.log(bands)
            res.render('lists/bandProfile',{
                band: bandsFromDb
            });
        }).catch(error => console.log(error))


    router.get('/band-profile', (req, res) => {
        res.render('authview/band-profile');
    });

    Band.findOneAndUpdate({_id: id}, {username, member, mediaLinks, genres, description,  imageUrl: req.file?.path })
    .then(createdBandFrDB => {
            console.log(createdBandFrDB)
            res.redirect('/bands/bandProfile')
        })
        .catch(error => console.log(error))
    })

module.exports = router;