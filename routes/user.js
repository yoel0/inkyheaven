const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:id", (req, res) => {
  console.log("this is the user id: ", req.params.id)
  db.user.findOne({
    where: { id: req.params.id }
  })
  .then(currentUser => {
    res.render("user/profile", { currentUser });
  })
  .catch(error => {
    console.log('Error:', error)
  })
})





module.exports = router;
