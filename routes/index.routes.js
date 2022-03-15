const router = require("express").Router();
const Musician = require("../models/Musician.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  const {currentUser} = req.session
  res.render("index", {loggedinuser: currentUser})
  console.log(currentUser)
});




router.get('/discover', (req, res) => {
  Musician.find()
  .then(musiciansFrDB => 
    res.render('lists/discover',{musiciansFrDB}))
  .catch(error =>  console.log(error))

})

router.get('/discover/search', (req, res)=> {
  const { instrument } = req.query;

  Musician.find()
  .then(allMusician => {
    const musiciansFrDB = allMusician.filter(musician => {
      const listofInstruments = musician.instruments && musician.instruments.split(" ")
      return listofInstruments && listofInstruments.includes(instrument)
    })
    res.render('lists/discover.hbs', {musiciansFrDB})
  }).catch(error => console.log(error))
})




module.exports = router;
