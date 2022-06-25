var Data = require('../models/data');
var Users = require('../models/user');

var cache;

exports.postData = (req, res) => {
    cache = req.body;
    cache.updateTime = new Date();
    
    Data.findOne({homeName: cache.homeName}, function(err, data) {
        if(data) {
            data.roomName = cache.roomName;
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