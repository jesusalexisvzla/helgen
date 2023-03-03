const { query } = require('express');
const express = require('express');
const { PositionLogs, Vehicles } = require('../models/positionLogs');

const router = express.Router();

// create user
router.post('/vehicles', (req, res) => {
    const vehicle = Vehicles(req.body);
    vehicle
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// get users with query
router.get('/vehicles?', (req, res) => { 
    console.log(req.url)
    if (req.url.length >= 10) {
        const obj = JSON.parse(decodeURI(req.url.substring(7)))
        const properties = obj.properties;
        const value = obj.value;
        const options = obj.options
        let queryObj = []
    
        for (const propertie of properties) {
            queryObj.push({ [propertie]: options['like'] ? {'$regex': value} : value})
        }
    
        Vehicles
            // .find({$or: [{ name: /alexis/i}, {email: /alexis/i }]})
            .find({$or: queryObj})
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        Vehicles
            .find(req.query)
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

module.exports = router;