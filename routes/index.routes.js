const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  const {currentUser} = req.session
  res.render("index", {musician: currentUser});
});

router.get('/profile', (req, res) => {
  const {currentUser} = req.session;
  if(!currentUser){
        res.redirect('/authview/login')
   }
    res.render('authview/profile', currentUser)
})


module.exports = router;
