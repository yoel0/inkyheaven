const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },
      include: [db.myLocation],
    })
    .then((currentUser) => {
      // console.log("🤲", currentUser);
      res.render("user/profile", { currentUser });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

module.exports = router;
