"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const catRoute = require("./routes/catRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const passport = require("./utils/pass");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json()); // for parsing application/json

app.use("/cat", passport.authenticate("jwt", { session: false }), catRoute);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/auth", authRoute);

//app.use("/cat", require("./routes"));

/*app.get("/", (req, res) => {
  console.log("get /");
  res.send("Hello to demo node and mongo, try /cat route 😉");
});*/

db.on("connected", () => {
  app.listen(3000, () => {
    console.log("express server started on port 3000");
  });
});
