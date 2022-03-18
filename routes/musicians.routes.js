const router = require("express").Router();
const Musician = require("../models/Musician.model.js");
const fileUploader = require("../config/cloudinary.config");



router.get('/profile/edit', (req, res) => {
  const { currentUser } = req.session;
  console.log(currentUser)

  if (!currentUser) {
    res.redirect('/authview/login')
  }

  Musician.findById(req.session.currentUser._id)
    .then((musicianFrDB) => {
      console.log("musicianFrDB", musicianFrDB);
      res.render("profile/edit-profile", {
        musician: musicianFrDB,
      })

    }).catch(error => console.log(error))

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
  Musician.findById(id).populate("notifications").populate('successfulMatch')
    .then((musicianFrDB) => {
      console.log('musicianFrDB:', musicianFrDB)
      console.log('myself:', req.session.currentUser)

      const isMyself = id === req.session.currentUser._id
      const isPending = req.session.currentUser.pendingRequests.includes(musicianFrDB._id.toString()) //musicianFrDB.notifications.includes(req.session.currentUser._id);
      const notifications = isMyself && musicianFrDB.notifications;
      const isMatch = musicianFrDB.successfulMatch.includes(req.session.currentUser._id)
      console.log('isPending:', isPending);
      console.log(notifications)
      res.render("profile/musicianProfile.hbs", {
        musician: musicianFrDB,
        isPending,
        isMyself,
        notifications,
        isMatch,
        successfulMatch: musicianFrDB.successfulMatch,
        messages: musicianFrDB.recievedMessage

      });
    }).catch(err => console.log(err));
});

router.post("/edit/:id", fileUploader.single("image"), (req, res) => {
  const { id } = req.params;
  const { username, instruments, mediaLinks, genres, description } = req.body;
  console.log("post here", instruments);

  // const newMediaLinks = mediaLinks.split(" ");
  // const newGenres = genres.split(" ");
  // const newDescription = description.split(" ");


  Musician.findOneAndUpdate(
    { _id: id },
    {
      username,
      instruments,
      mediaLinks,
      genres,
      description,
      imageUrl: req.file?.path,

    }
  )
    .then((createdMusicainFrDB) => {
      console.log(createdMusicainFrDB);
      res.redirect(`/profile/${id}`);
    })
    .catch((error) => console.log(error));
});

router.post("/message/:id", (req, res) =>{
  const { messages } = req.body
  const { id } = req.params;

  Musician.findOneAndUpdate(
    { _id: id },
    { $push: { recievedMessage: messages } },
    { new: true }
).then(updatedMusician => {
  console.log(updatedMusician)
  res.send('ok')
})
  .catch(err => console.log(err)) 
})


router.get('/listofmusicians', (req, res) => {

  Musician.find()
    .then(musicians => res.render("authview/listofmusicians", { musicians }))
})
module.exports = router;
