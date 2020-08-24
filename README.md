# inky Heaven

---

Project 2 General Assembly Full-Stack App

## Project Requirements

- Include sign up/log in functionality, with hashed passwords & an authorization flow. You will be able to start your app from the auth boilerplate built w/ in-class code-alongs.
- Have at least 2 models (more if they make sense) that represents the main functional idea for your app.
- Incorporate at least one third-party API.
- Have complete RESTful routes for at least one of your resources (models) with GET, POST, PUT, and DELETE
- Utilize an ORM to create a database table structure and interact with your relationally-stored data.
- Include a readme file that explains how to use your app.
- Have semantically clean HTML, CSS, and back-end code.
- Be deployed online and accessible to the public.

## Technologies Used

- Node.js
- Express.js
- Javascript
- EJS
- HTML5
- CSS
- Materialize (CDN)
- PostgreSQL
- Passport
- Store Session
- Leaflet (JS Library)

---

## Concept

inky Heaven Weather + Astronomy Portal
inky Heaven is a powerful weather and astronomy portal tool that will allow you to access any location, weather and astronomy globally by;

- Latitude and Longitude
- City Name
- US Zipcode
- UK Postcode
- Canada Postalcode
- IATA (3 Digit Airport Codes)
- IP Address

---

## Where to access inky Heaven

inky Heaven has been deployed using heroku.
Access it here: [inky Heaven](https://inky-heaven.herokuapp.com/)

### How to Install Locally

1. Fork and clone [this](https://github.com/yoel0/inkyheaven) repo

2. Run `npm install`

3. Update the config.json file dialect to route to your database

4. Run `sequelize db:create`

5. Run `sequelize db:migrate`

6. Create your .env file and give it your hidden variable information as shown below:

   - SECRET_SESSION = 'your unique random string here'

   - API_KEY = 'you can apply for an api key at [weatherAPI](https://www.weatherapi.com/)'

7. Run `nodemon` and open your browser to localhost:3000

8. Access the inky Heaven's Weather & Astronomy Portal!

---

## inky Heaven at a Glance;

- Home Page ![Home page image](https://i.imgur.com/sbswlia.png)
- Search Page ![Search page image](https://i.imgur.com/yuIYGWh.png)
- Result Page ![Result page image](https://i.imgur.com/4ARL9aQ.png)
- Detail Page ![Detail page image](https://i.imgur.com/XkXVTxd.png)
- Profile Page ![Profile page image](https://i.imgur.com/2yjoD52.png)

## User Stories

> User can log in or sign up to view weather and astronomy forecast by location.

> User can save their or multiple location, weather and astronomy cast to their "Profile Page".

> User can edit their location name in their saved profile page in example; Los Angeles --> "My Hometown" etc.

> User can delete saved locations under their "Profile Page"

---

## Planning

### ERD

- ERD ![ERD](https://i.imgur.com/5VUHwQG.png)

### Initial Wireframe Visualization

- INDEX Page ![INDEX Page](https://i.imgur.com/DSN7jXV.png)
- LOGIN Page ![LOGIN Page](https://i.imgur.com/jPtIsJu.png)
- SEARCH Page ![SEARCH Page](https://i.imgur.com/U1FIRuo.png)
- RESULT Page ![RESULT Page](https://i.imgur.com/wl7qMGm.png)
- PROFILE Page ![PROFILE Page](https://i.imgur.com/aKQoT6R.png)

---

## Code Snippets

- Deploying Leaflet JS and creating the Leaflet MAP Script:

> This was alot of fun an experience that reminded me of HTML canvas in where we deploy an empty div with the id of "mapid" on any page we desire then target this empty div render / draw and chart our map functionality vis a vis its "id".

```html
<div id="mapid"><!-- map is drawn here --></div>
```

- Here is the script we write to target our mapbox (empty div) and speicfy how we want to tile our map pay respects with attribution customize popups / zooms etc the list is quite extensive!

```html
<script>
    var lat = <%- lat %>
    var lon = <%- lon %>

    var mymap = L.map("mapid").setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      // tileSize: 512,
      // zoomOffset: -1,
    }).addTo(mymap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(mymap);

    L.marker([lat, lon]).addTo(mymap)
      .bindPopup('This is where you\'ve searched.')
      .openPopup();

      var popup = L.popup();

  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(mymap);
  }

  mymap.on('click', onMapClick);
</script>
```

- CSS Typography Manipulation implemented in inky Heaven

This is a really cool word manipulation for hyper visual effect~

```html
<div class="center-align magicheader">
  <span class="letter" data-letter="F">F</span>
  <span class="letter" data-letter="O">O</span>
  <span class="letter" data-letter="R">R</span>
  <span class="letter" data-letter="E">E</span>
  <span class="letter" data-letter="C">C</span>
  <span class="letter" data-letter="A">A</span>
  <span class="letter" data-letter="S">S</span>
  <span class="letter" data-letter="T">T</span>
</div>
```

- This is the CSS Manipulation portion!

```css
@import url(https://fonts.googleapis.com/css?family=Lato:900);
*,
*:before,
*:after {
  box-sizing: border-box;
}

.magicheader {
  font-family: "Lato", sans-serif;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.letter {
  display: inline-block;
  font-weight: 900;
  font-size: 8em;
  margin: 0.2em;
  position: relative;
  color: #00b4f1;
  transform-style: preserve-3d;
  perspective: 400;
  z-index: 1;
}
.letter:before,
.letter:after {
  position: absolute;
  content: attr(data-letter);
  transform-origin: top left;
  top: 0;
  left: 0;
}
.letter,
.letter:before,
.letter:after {
  transition: all 0.3s ease-in-out;
}
.letter:before {
  color: #fff;
  text-shadow: -1px 0px 1px rgba(255, 255, 255, 0.8), 1px 0px 1px rgba(0, 0, 0, 0.8);
  z-index: 3;
  transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg);
}
.letter:after {
  color: rgba(0, 0, 0, 0.11);
  z-index: 2;
  transform: scale(1.08, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 1deg);
}
.letter:hover:before {
  color: #fafafa;
  transform: rotateX(0deg) rotateY(-40deg) rotateZ(0deg);
}
.letter:hover:after {
  transform: scale(1.08, 1) rotateX(0deg) rotateY(40deg) rotateZ(0deg) skew(0deg, 22deg);
}
```

- Credit for this typogrpahy goes to [Bernardo @ Codepen](https://codepen.io/bernardo/pen/ugApF)

## Stretch Goal Achieved

> Added a Map to each location to render the exact latitude and longititude of a location searched!

## Future Stretch Goals

> I would love to expand the user interface and profile page to implement things such as;

- Uploading Profile Picture.
- Ability to DELETE user account.
- Ability to subscribe to forecast updates via email-list.
- Creating a IN-APP messenger for users to interact discuss and share their favorite locations.
- Implementing spotify playlists for individual user profiles, so users can jam to music while browsing locations.

---

## Author

- Yoel Morad - Initial creator

## Honorable Mentions to my Mentors and Dev Family!

- I am a big believer in paying hommage to those who have helped me grow, nurtured me and impowered me to fully release my potential as a Dev, so without further delay a huge thank you to my mentors and dev family:

> My Mentors

- God-Mode FULL-STACK SR Software Engineer,<br>
  [Rome "Caesar, JS Conqueror" Bell](https://github.com/romebell)
- SCRUM Master,<br>
  [Adam "Professor Oak" Honore](https://github.com/ahonore42)
- Tech Lead, (Special Shoutout for introducing me to the Leaflet JS Library)<br>
  [Seanny "Brilliant" Phoenix](https://github.com/SeannyPhoenix)
- Principal Software Engineer,<br>
  [Erik "Hawk Eyes" Heikkila](https://github.com/erik-hei)
- Front-End SR Software Engineer,<br>
  [Melissa "Aesthethic Queen" Young](https://github.com/melissay94)
- Software Architect,<br>
  [Micaela "Le MAC" Jankowski](https://github.com/micajank)

> My Dev Family through this project;

- Kuya! Levin, you're heart of gold and your constant presence has always been uplifting without that light of energy you bring this world would feel a little more empty, Thank you for your guidance and constant shine, you are the sun my brother.<br>
  [Levin Batallones](https://github.com/vbatallones)

- Bong! CHAMONgg, the countless nights we spent in the late hours coding back to back talking about our code digesting and even relaxing with some music when we've pushed above and beyond you have been a part of this process since day 1, only love dear brother.<br>
  [Chamon Math](https://github.com/chamon562)

- Shane, a brother in every sense of the word, whenever self doubt kicks in this beautiful soul kicks back can't even count how many times you and I have fought through sheets of code together without sense of time, thirst or hunger it always seems like you and I walk through hell and back what words can I say other than I am blessed to call you a brother.<br>
  [Shane Bendak](https://github.com/SLBendak)

* Big shoutout to Cristina! The best meimei(Sista'), anyone could ask for! her insight, vision of clarity and tranquil approach has always rendered her the sharpest blade in my eyes! Thank you for the Global ERR lessons <3 and most of all for being you, you amazing soul.<br>
  [Cristina Nguyen](https://github.com/crnguyen)
