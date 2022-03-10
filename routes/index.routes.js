const router = require("express").Router();
const Musician = require("../models/Musician.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  const {currentUser} = req.session
  res.render("index", {loggedinuser: currentUser})
  console.log(currentUser)
});

router.get('/profile', (req, res) => {
  const {currentUser} = req.session;
  if(!currentUser){
        res.redirect('/authview/login')
   }

   Musician.findById(req.session.currentUser._id).then((musicianFrDB) => {
     console.log("musicianFrDB",musicianFrDB);
    res.render("authview/profile", {
      musician: musicianFrDB,
    });
});

})


module.exports = router;
