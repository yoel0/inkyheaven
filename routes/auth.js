const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/ppConfig");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/signup", (req, res) => {
  db.user
    .findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        name: req.body.name,
        password: req.body.password,
      },
    })
    .then(([user, created]) => {
      if (created) {
        // if created, success and redirect to home
        console.log(`${user.name} was created`);
        // FLASH MESSAGE
        passport.authenticate("local", {
          successRedirect: "/",
          successFlash: "Account created and logging in",
        })(req, res);
        // before passport authenticate
        // res.redirect("/");
      } else {
        // Email already exist
        console.log("Email already exist");
        // FLASH
        req.flash("error", "Email already exists. Please try again.");
        res.redirect("/auth/signup");
      }
    })
    .catch((error) => {
      console.log("Error", error);
      req.flash("error", "Error, unfortunately...");
      res.redirect("/auth/signup");
    });
});

// FLASH MESSAGE
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome back.",
    failureFlash: "Either email or password is incorrect. Please try again.",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  // FLASH MESSAGE
  req.flash("success", "See you soon. Logging out.");
  res.redirect("/");
});

module.exports = router;
