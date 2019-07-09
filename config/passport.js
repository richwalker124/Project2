var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.userLogin
        .findOne({
          where: {
            email: email
          }
        })
        .then(function(dbUser) {
          // If: checks given email address against database
          if (!dbUser) {
            console.log(`An incorrect email address was attempted: ${email}`);
            return done(null, false, {
              message: "Invalid login, please try again!"
            });
            // Else if: checks password to see if it is correct
          } else if (!dbUser.validPassword(password)) {
            console.log("An incorrect password was attempted");
            return done(null, false, {
              message: "Invalid login, please try again!"
            });
            // Else: none of the above, return the user
          } else {
            return done(null, dbUser);
          }
        });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
