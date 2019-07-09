const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isNotAuthenticated = require("../config/middleware/isNotAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", isAuthenticated, function (req, res) {
    // console.log("RES::", res);
    db.userLogin.findOne({
      where: {
        userId: req.user.userId
      }
    }).then(function (dbAccount) {
      db.postTable
        .findAll({
          limit: 10,
          order: [["postId", "DESC"]]
        })
        .then(function (dbPosts) {
          res.render("index", {
            account: dbAccount,
            post: dbPosts
          });
        });
      // console.log("dbAccount::", dbAccount);
    });
  });

  app.get("/home", isNotAuthenticated, function (req, res) {
    res.render("home");
  });

  // Load example page and pass in an example by id
  app.get("/account/:id", isAuthenticated, function(req, res) {
    db.userLogin
      .findOne({ where: { userId: req.params.id } })
      .then(function(dbAccount) {
        res.render("example", {
          account: dbAccount
        });
      });
  });

  // Route for viewing account page
  app.get("/account", isAuthenticated, function (req, res) {
    // console.log("ACCOUNT:", req);
    db.userLogin.findOne({
      where: {
        userId: req.user.userId
      }
    })
      .then(function (dbAccount) {
        res.render("account", {
          account: dbAccount
        });
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
