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

var cacheServer;
var cacheClient;
var oldTime;

// Gửi từ web
exports.postDataServer = (req, res) => {
    cacheServer = req.body;
    console.log(cacheServer);
    cacheServer.updateTime = new Date();
    res.redirect('/data/get-server');
};

// Gửi từ thiết bị
exports.postDataClient = (req, res) => {
  cacheClient = req.body;
  console.log(cacheClient);
  cacheClient.updateTime = new Date();
  oldTime = cacheClient.updateTime;
  res.redirect('/data/get-client');
};

// Nhận dữ liệu từ web
exports.getDataServer = (req, res) => {
  console.log(cacheServer)
  res.send(cacheServer);
};

// Nhận dữ liệu từ thiết bị
exports.getDataClient = (req, res) => {
  console.log(cacheClient);
  Data.findOne({homeName: cacheClient.homeName}, function(err, data) {
    if(data) {
        data.homeName = cacheClient.homeName;
        data.temp = cacheClient.temp;
        data.humd = cacheClient.humd;
        data.room = cacheClient.room;
        data.updateTime = cacheClient.updateTime;

        data.save();
    }else {
        new Data(cacheClient).save();
    }
})
  res.send(cacheClient);
};

exports.getChangeDevice = (req, res) => {
    var homeNameSelect = req.params.slug;
    console.log(homeNameSelect);
    
    req.user.homeNameCurrent = homeNameSelect;
    console.log(req.user.homeNameCurrent);
    req.user.save();

   res.redirect('/');
}
