require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require("./config/ppConfig");
const flash = require("connect-flash");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// require the authorization middleware at the top of the page
const isLoggedIn = require("./middleware/isLoggedIn");
const db = require("./models");
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30, // session expires after 30 min
});

app.set("view engine", "ejs");

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(layouts);

// secret: What we actually giving the user to use our site / session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: if we have a new session, we'll save it, therefore,
// setting this to true

app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
sessionStore.sync();

// Initialize passport and run session as middleware - always under session
app.use(passport.initialize());
app.use(passport.session());
// flash for temporary messages to the server
app.use(flash());

// middleware to have our message accessible for every view
app.use((req, res, next) => {
  // before every route, we will attach our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => {
  if (req.user) {
    // console.log(isLoggedIn);
    db.user
      .findOne({
        where: {
          id: req.user.id,
        },
      })
      .then((currentUser) => {
        // console.log(currentUser);
        res.render("index", { alerts: res.locals.alerts, currentUser });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.render("index", { alerts: res.locals.alerts });
  }
});

app.use("/auth", require("./routes/auth"));
app.use("/locations", require("./routes/locations"));
app.use("/user", require("./routes/user"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
