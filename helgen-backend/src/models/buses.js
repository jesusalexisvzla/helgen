const mongoose = require('mongoose');

const busesSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: String,
        required: true
    },
    longtitus: {
        type: String,
        required: true
    },
    vehicleId: {
        type: String,
        required: true
    }
});

const Buses = mongoose.model('Buses', busesSchema)

module.exports = {
    Buses
}