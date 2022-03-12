
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

router.get("/connect/accept/:id", (req,res) => {
    const otherUserId = req.params.id;
    const currentUserId = req.session.currentUser._id;
    // I am in the pending of the other
    // the other is in my notifications

    Musician.findOneAndUpdate(
        {_id: currentUserId},
        {
            $push: {successfulMatch: otherUserId},
            $pull: {notifications: otherUserId}
        },
        {new:true}
    ).then(updatedSelf => {
        req.session.currentUser = updatedSelf
        return Musician.findOneAndUpdate(
            {_id: otherUserId},
        {
            $push: {successfulMatch: currentUserId},
            $pull: {pendingRequests: currentUserId}
        },
        {new:true}
        )
    }).then(update => console.log(update)).catch(err => console.log(err))




    const myModifier = {
        successfulMatch: [otherUserId],
        notifications:[]

    }
    const otherModifier = {
        pendingRequests: [],
        successfulMatch: [currentUserId]
    }

})

router.get("/connect/decline/:id", (req,res) => {
    const otherUserId = req.params.id;
    const currentUserId = req.session.currentUser._id;
    
    Musician.findOneAndUpdate(
        {_id: currentUserId},
        {
            //$pull: {pendingRequests: otherUserId},
            $pull: {notifications: otherUserId}
        },
        {new:true}
    ).then(updatedSelf => {
        req.session.currentUser = updatedSelf
        return Musician.findOneAndUpdate(
            {_id: otherUserId},
        {
            $pull: {pendingRequests: currentUserId}
        },
        {new:true}
        )
    }).then(update => console.log(update)).catch(err => console.log(err))

})

module.exports = router

