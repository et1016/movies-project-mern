const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const favouriteRoute = require("./routes").favourite;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas 連結成功 ...");
  })
  .catch((err) => {
    console.log(err);
    console.log("MongoDB Atlas 連結失敗 ...");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
  "/api/favourite",
  passport.authenticate("jwt", { session: false }),
  favouriteRoute
);

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
