const router = require("express").Router();
const Musician = require("../models/Musician.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  const {currentUser} = req.session
  res.render("index", {loggedinuser: currentUser})
  console.log(currentUser)
});




module.exports = router;
