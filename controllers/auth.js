const passport = require("passport");
const nodemailer = require("nodemailer");
const Users = require("../models/user");
var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");
const { readyException } = require("jquery");

exports.getIndexLivingroom = (req, res) => {
  if(!req.user) {
    return res.redirect("/login")
  } else if(!req.user.homeModel) {
    return res.redirect("/verify-home")
  }
  res.render("index", {
    title: "Trang chủ",
    user: req.user
  });
  console.log("abs")
};

exports.getBedroom1 = (req, res, next) => {
  res.render("bedroom1-view", {
    title: "Bedroom 1",
    user: req.user
  });
};

exports.getBedroom2 = (req, res, next) => {
  res.render("bedroom2-view", {
    title: "Bedroom 2",
    user: req.user
  });
};

exports.getKitchen = (req, res, next) => {
  res.render("kitchen-view", {
    title: "Kitchen",
    user: req.user
  });
};

exports.getBathroom = (req, res, next) => {
  res.render("bathroom-view", {
    title: "bathroom",
    user: req.user
  });
};
