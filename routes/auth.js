const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("一個請求正在進入 auth.js ...");
  next();
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("電子郵件已註冊過。");

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ msg: "用戶保存成功 ...", saveObject: savedUser });
  } catch (err) {
    res.status(400).send("用戶未保存 ...");
  }
});

router.post("/login", (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("資料庫未找到此電子郵件，再試試看吧。");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = {
            username: user.username,
            _id: user._id,
            email: user.email,
          };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          res.status(401).send("密碼錯誤，再試試看吧。");
        }
      });
    }
  });
});

module.exports = router;
