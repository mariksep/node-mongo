"use strict";
const jwt = require("jsonwebtoken");
const passport = require("../utils/pass");

const login = (req, res) => {
  // TODO: add passport authenticate
  console.log(req.body);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("login info", info);
    if (err || !user) {
      return res.send("error");
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send("error");
      }
      const token = jwt.sign(user, "1234");
      console.log(token);
      return res.json({ user, token });
    });
  })(req, res);
};

module.exports = {
  login,
};
