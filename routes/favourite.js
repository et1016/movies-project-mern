const router = require("express").Router();
const User = require("../models/user-model");

router.use((req, res, next) => {
  console.log("一個請求正在進入 favourite.js");
  next();
});

router.post("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { movie_id } = req.body;
  try {
    const user = await User.findOne({ _id: user_id });
    user.favourite.push(movie_id);
    await user.save();
    res.send("已將 movie_id 放入目前使用者當中。");
  } catch (err) {
    res.send(err);
  }
});

router.get("/search/:user_id", async (req, res) => {
  const { user_id } = req.params;
  await User.findOne({ _id: user_id })
    .then((movieId) => {
      res.send(movieId);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/delete/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { movie_id } = req.body;
  try {
    await User.updateOne({ _id: user_id }, { $pull: { favourite: movie_id } });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
