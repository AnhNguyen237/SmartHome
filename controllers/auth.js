const passport = require("passport");
const nodemailer = require("nodemailer");
const Users = require("../models/user");
const Data = require("../models/data");
var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");


exports.getIndexLivingroom = (req, res) => {
  if(!req.user) {
    return res.redirect("/login")
  } else if(!req.user.homeModel[0]) {
    return res.redirect("/verify-home")
  }

  Data.findOne({homeName: req.user.homeNameCurrent})
    .then( homeData => {
      if(homeData) {
        res.render("index", {
          title: "Trang chủ",
          user: req.user,
          data: homeData
        });
      }else {
        res.render("waiting-connection", {
          title: "Chờ kết nối",
          user: req.user
        });
      }
    })
};

exports.getBedroom1 = (req, res, next) => {
  Data.findOne({homeName: req.user.homeNameCurrent})
    .then( homeData => {
      if(homeData) {
        res.render("bedroom1-view", {
          title: "Bedroom 1",
          user: req.user,
          data: homeData
        });
      }else {
        res.render("waiting-connection", {
          title: "Chờ kết nối",
          user: req.user
        });
      }
    })
};

exports.getBedroom2 = (req, res, next) => {
  Data.findOne({homeName: req.user.homeNameCurrent})
    .then( homeData => {
      if(homeData) {
        res.render("bedroom2-view", {
          title: "Bedroom 2",
          user: req.user,
          data: homeData
        });
      }else {
        res.render("waiting-connection", {
          title: "Chờ kết nối",
          user: req.user
        });
      }
    })
};

exports.getKitchen = (req, res, next) => {
  Data.findOne({homeName: req.user.homeNameCurrent})
    .then( homeData => {
      if(homeData) {
        res.render("kitchen-view", {
          title: "Kitchen",
          user: req.user,
          data: homeData
        });
      }else {
        res.render("waiting-connection", {
          title: "Chờ kết nối",
          user: req.user
        });
      }
    })
};

exports.getBathroom = (req, res, next) => {
  Data.findOne({homeName: req.user.homeNameCurrent})
    .then( homeData => {
      if(homeData) {
        res.render("bathroom-view", {
          title: "Bathroom",
          user: req.user,
          data: homeData
        });
      }else {
        res.render("waiting-connection", {
          title: "Chờ kết nối",
          user: req.user
        });
      }
    })
};
