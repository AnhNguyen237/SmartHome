var express = require("express");
var router = express.Router();
var dataController = require("../controllers/data");
var User = require('../models/user');

var homeNameCurrent;

User.findOne({homeNameCurrent})
    .then(homeName => {
        homeNameCurrent = homeName;
    })

router.post("/data/update", dataController.postData);

router.get("/data/get", dataController.getData);

router.get("/smart-home/:slug", dataController.getChangeDevice);

module.exports = router;
