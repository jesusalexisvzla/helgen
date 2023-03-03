const mongoose = require('mongoose');

const positionLogs = new mongoose.Schema({
    date: {
        type: String,
        required: false,
    },
    time: {
        type: String,
        required: false,
        unique: true
    },
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
    vehicle: {
        type: String,
        ref: "Vehicle",
    }
});

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const PositionLogs = mongoose.model('PositionLogs', positionLogs)
const Vehicles = mongoose.model('Vehicles', vehicleSchema)

module.exports = {
    PositionLogs, Vehicles
}