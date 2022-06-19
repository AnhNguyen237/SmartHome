var express = require("express");
var router = express.Router();
var passport = require("passport");
const userController = require("../controllers/user");

router.get("/login", userController.getLogin);

router.post("/login", userController.postLogin);

router.get("/verify-home", userController.getVerifyHome);

router.post("/verify-home", userController.postVerifyHome);

router.get("/logout", userController.getLogout);

router.get("/register", userController.getSignUp);

router.post("/register", userController.postSignUp);

router.get("/verify-email", userController.getVerifyEmail);

router.post("/verify-email", userController.postVerifyEmail);

router.get("/forgot-password", userController.getForgotPass);

router.post("/forgot-password", userController.postForgotPass);

router.get("/change-password", userController.getChangePassword);

router.post("/change-password", userController.postChangePassword);

module.exports = router;
