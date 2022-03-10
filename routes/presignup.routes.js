const mongoose = require('mongoose');
const router = require('express').Router();


router.get("/auth/presignup", (req,res) =>{
    res.render("authview/pre-signup")
})

module.exports = router;