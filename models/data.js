const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    homeName: {
        type: String
    },
    temp: {
        type: Number
    },
    humd: {
        type: Number
    },
    room: [
        {
            roomName: {
                type: String
            },
            roomDevice: [
                {
                    deviceName: {
                        type: String
                    },
                    status: {
                        type: Boolean,
                        require: false
                    },
                    auto: {
                        type: Boolean,
                        require: false
                    },
                    speedFanAir: {
                        type: Number,
                        require: false
                    },
                    tempAir: {
                        type: Number,
                        require: false
                    },
                    volume: {
                        type: Number,
                        require: false
                    },
                    channel: {
                        type: String,
                        require: false
                    },
                    speedFan: {
                        type: Number,
                        require: false
                    },
                    timer: {
                        type: Number,
                        require: false
                    },
                    mode: {
                        type: String,
                        require: false
                    },
                    water: {
                        type: String,
                        require: false
                    }
                }
            ]
        }
    ],
    updateTime: {
        type: Date,
        require: true
    }
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
