const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
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
  console.log(req.query.lat)
  let lat = req.query.lat
  let lon = req.query.lon
  axios.get(forecastURL + lat + ',' + lon)
  .then(details => {
    console.log(details.data)
    console.log(details.data.forecast.forecastday[0])
    let forecast = details.data
    res.render('locations/detail', { forecast })
  })
  .catch(error => {
    console.log('Error: ', error)
  })
})




module.exports = router;
