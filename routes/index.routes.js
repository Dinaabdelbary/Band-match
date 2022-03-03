const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  const {currentUser} = req.session
  res.render("index", {musician: currentUser});
});

module.exports = router;
