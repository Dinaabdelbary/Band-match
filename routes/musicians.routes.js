const router = require("express").Router();
const Musician = require("../models/Musician.model.js");
const fileUploader = require("../config/cloudinary.config");



router.get('/profile/edit', (req, res) => {
  const {currentUser} = req.session;
  console.log(currentUser)

  if(!currentUser){
        res.redirect('/authview/login')
   }

   Musician.findById(req.session.currentUser._id)
   .then((musicianFrDB) => {
     console.log("musicianFrDB",musicianFrDB);
    res.render("profile/edit-profile", {
      musician: musicianFrDB,
    })
   
}) .catch(error => console.log(error))

})

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

router.get("/profile/:id", (req, res) => {
  const { id } = req.params
  Musician.findById(id)
  .then((musicianFrDB) => {
      res.render("profile/musicianProfile.hbs", {
        musician: musicianFrDB,
        isMyself: id === req.session.currentUser._id
      });
  }).catch(err => console.log(err));
});

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


// router.post('/edit/:id', fileUploader.single('image'), (req, res) => {
//     const {id} = req.params
//     const { username, instruments, mediaLinks, genres, description } = req.body
//     console.log('post here',instruments,)
//     let newInstruments  = instruments.split(" ");

//     Musician.findOneAndUpdate({_id: id}, { username, instruments :newInstruments, mediaLinks, genres, description,  imageUrl: req.file?.path })
//         .then(createdMusicainFrDB => {
//             console.log(createdMusicainFrDB)
//             res.redirect('/musicians/musicianProfile')
//         })
//         .catch(error => console.log(error))
// })

router.get('/listofmusicians', (req, res) => {

    Musician.find()
    .then(musicians => res.render("authview/listofmusicians", {musicians}))
})
module.exports = router;
