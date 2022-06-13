var express = require("express");
var router = express.Router();
var passport = require("passport");
const authController = require("../controllers/auth");

/* GET home page. */

router.get("/living-room", authController.getIndexLivingroom);

router.get("/", authController.getIndexLivingroom);

router.get("/bedroom-1", authController.getBedroom1);

router.get("/bedroom-2", authController.getBedroom2);

router.get("/kitchen", authController.getKitchen);

router.get("/bathroom", authController.getBathroom);

module.exports = router;
