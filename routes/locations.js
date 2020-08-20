const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const searchURL = `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=`;

router.get("/", (req, res) => {
  console.log("this is my search: ", req.query.search);
  let search = req.query.search;
  axios
    .get(searchURL + search)
    .then((results) => {
      console.log("API DATA: ", results.data);
      let locations = results.data;

      res.render("locations/result", { locations });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

router.get("/detail", (req, res) => {
  // console.log(req.query.lat)
  let lat = req.query.lat;
  let lon = req.query.lon;

  axios
    .get(forecastURL + lat + "," + lon)
    .then((details) => {
      // console.log(details.data)
      // console.log(details.data.forecast.forecastday[0])
      let forecast = details.data;
      // console.log(forecast.alert)
      res.render("locations/detail", { forecast });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

router.post("/", (req, res) => {
  db.myLocation
    .findOrCreate({
      where: {
        userId: req.user.id,
        lat: req.body.lat,
        long: req.body.long,
      },
      defaults: {
        title: req.body.title,
      },
    })
    .then((location) => {
      res.redirect("/user");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

router.get("/edit/:id", (req, res) => {
  console.log("hitting the edit route");
  res.render("user/edit", {
    title: req.query.title,
    id: req.params.id,
  });
});

// STEPS: findOne db.mylocation.findOne
// look for where the id matches req.params.id
// then db.myLocation.update()
// then set title to be req.body.title
// then redirect to profile

router.put("/edit/:id", (req, res) => {
  db.myLocation
    .update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((mylocations) => {
      res.redirect("/user");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

router.delete("/:id", (req, res) => {
  db.myLocation
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      res.redirect("/user");
    })
    .catch((error) => {
      console.log("Error in delete/id route in locations.js:", error);
    });
});

module.exports = router;
