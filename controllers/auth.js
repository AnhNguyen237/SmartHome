const passport = require("passport");
const nodemailer = require("nodemailer");
const Users = require("../models/user");
const Data = require("../models/data");
var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");

var homeNameUserUsing;

exports.getIndexLivingroom = (req, res) => {
  if(!req.user) {
    return res.redirect("/login")
  } else if(!req.user.homeModel[0]) {
    return res.redirect("/verify-home")
  }

  homeNameUserUsing = req.user.homeNameCurrent;

  Data.findOne({homeName: homeNameUserUsing})
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
  
  homeNameUserUsing = req.user.homeNameCurrent;

  Data.findOne({homeName: homeNameUserUsing})
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
  homeNameUserUsing = req.user.homeNameCurrent;

  Data.findOne({homeName: homeNameUserUsing})
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
  homeNameUserUsing = req.user.homeNameCurrent;

  Data.findOne({homeName: homeNameUserUsing})
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
  homeNameUserUsing = req.user.homeNameCurrent;

  Data.findOne({homeName: homeNameUserUsing})
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

var cache;

exports.postData = (req, res) => {
    cache = req.body;
    console.log(cache);
    cache.updateTime = new Date();
    Data.findOne({homeName: cache.homeName}, function(err, data) {
      if(data) {
          data.homeName = cache.homeName;
          data.temp = cache.temp;
          data.humd = cache.humd;
          data.room = cache.room;
          data.updateTime = cache.updateTime;

          data.save();
      }else {
          new Data(cache).save();
      }
  })
    res.redirect('/data/get');
};

exports.getData = (req, res) => {
  console.log(cache)
  res.send(cache);
};

exports.getChangeDevice = (req, res) => {
    var homeNameSelect = req.params.slug;
    console.log(homeNameSelect);
    
    req.user.homeNameCurrent = homeNameSelect;
    console.log(req.user.homeNameCurrent);
    req.user.save();

   res.redirect('/');
}
