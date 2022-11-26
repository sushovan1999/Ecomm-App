const express = require("express");
const expressApp = express();
const router = express.Router();
const controller = require("../controller/auth.controller");
const verifySignUp = require("../middlewares/verifysignup");
expressApp.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUserName, verifySignUp.checkRoleExisted],
  controller.signup
);
router.post("/signin", controller.signin);

module.exports = router;
