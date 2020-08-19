const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const { Router } = require("express");
const API_KEY = process.env.API_KEY;
const searchURL = `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=`;

router.get('/', (req, res) => {
  console.log('this is my search: ', req.query.search)
  let search = req.query.search
  axios.get(searchURL + search)
  .then(results => {
    console.log('API DATA: ', results.data)
    let locations = results.data
    res.render('locations/result', { locations })
  })
  .catch(error => {
    console.log('Error: ', error)
  })
})

router.get('/detail', (req, res) => {
  // console.log(req.query.lat)
  let lat = req.query.lat
  let lon = req.query.lon
  axios.get(forecastURL + lat + ',' + lon)
  .then(details => {
    console.log(details.data)
    // console.log(details.data.forecast.forecastday[0])
    let forecast = details.data
    // console.log(forecast.alert)
    res.render('locations/detail', { forecast })
  })
  .catch(error => {
    console.log('Error: ', error)
  })
})

router.post('/', (req, res) => {
  db.myLocation.findOrCreate({
    where: {
      userId: req.user.id,
      lat: req.body.lat,
      long: req.body.long
    },
    defaults: {
      title: req.body.title
    }
  })
  .then(location => {
  res.redirect('/user')
  })
  .catch(error => {
    console.log('Error:', error)
  })
})

router.get('/:id', (req, res) => {
  console.log('hitting the edit route')
  // use the id to grab the title from the location db, pass in the title to the edit.ejs page on render
})

// router PUT/id route then will update db req.params.id update title


router.delete('/:id', (req, res) => {
  db.myLocation.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/user')
  })
  .catch(error => {
    console.log('Error in delete/id route in locations.js:', error)
  })
})




module.exports = router;
