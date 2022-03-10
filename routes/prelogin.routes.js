const mongoose = require('mongoose');
const router = require('express').Router();


router.get("/auth/prelogin", (req,res) =>{
    res.render("authview/prelogin")
});

module.exports = router;