const router = require("express").Router();
const Musician = require("../models/Musician.model.js");
const fileUploader = require("../config/cloudinary.config");

router.get("/musicianProfile", (req, res) => {
  Musician.findById(req.session.currentUser._id).then((musicianFrDB) => {
      res.render("lists/musicianProfile.hbs", {
        musician: musicianFrDB,
      });
  });
});

// router.get("/profile", (req, res) => {
//     console.log(" i am here");
//   Musician.findById(req.session.currentUser._id)
//     .then((musicianFrDB) => {
//         console.log("musicianFrDB",musicianFrDB);
//       res.render("authview/profile", { musicianFrDB });
//     })
//     .catch((error) => console.log(error));

//   // res.render("authview/profile", {
//   //     musician: req.session.currentUser
//   // });
// });

router.post("/edit/:id", fileUploader.single("image"), (req, res) => {
  const { id } = req.params;
  const { username, instruments, mediaLinks, genres, description } = req.body;
  console.log("post here", instruments);

  const newMediaLinks = mediaLinks.split(" ");
  const newGenres = genres.split(" ");
  const newDescription = description.split(" ");

  Musician.findOneAndUpdate(
    { _id: id },
    {
      username,
      instruments: instruments,
      mediaLinks: newMediaLinks,
      genres: newGenres,
      description: newDescription,
      imageUrl: req.file?.path,
    }
  )
    .then((createdMusicainFrDB) => {
      console.log(createdMusicainFrDB);
      res.redirect("/musicians/musicianProfile");
    })
    .catch((error) => console.log(error));
});

module.exports = router;