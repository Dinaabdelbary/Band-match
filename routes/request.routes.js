
const mongoose = require('mongoose');
const Musician = require('../models/Musician.model');

const router = require('express').Router();

router.get("/connect/:id", (req, res) => {
    const otherUserId = req.params.id;
    const currentUserId = req.session.currentUser._id;
    
    Musician.findOneAndUpdate(
        {_id: currentUserId},
        { $push: { pendingRequests: otherUserId } },
        { new: true }
        )
    .then(updatedUser => {
        console.log(updatedUser)
        req.session.currentUser = updatedUser;

        return Musician.findOneAndUpdate(
            {_id: otherUserId},
            { $push: { notifications: currentUserId } },
            {new: true}
        )

    }).then(update => {
        res.redirect(`/profile/${otherUserId}` )
        console.log(update)
    })
    .catch(err => console.log(err))
})

module.exports = router

