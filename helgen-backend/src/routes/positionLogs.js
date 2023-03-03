const { query } = require('express');
const express = require('express');
const { PositionLogs, Vehicles } = require('../models/positionLogs');

const router = express.Router();

// create positionLogs
router.post('/positionLogs', (req, res) => {
    const positionLogs = PositionLogs(req.body);
    positionLogs
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// get positionLogs
router.get('/positionLogs?', (req, res) => { 
    if (req.url.length >= 14) {
        const obj = JSON.parse(decodeURI(req.url.substring(14)))
        const properties = obj.properties;
        const value = obj.value;
        const options = obj.options
        let queryObj = []
    
        for (let [i, propertie] of properties.entries()) {
            if (options?.manyValues) {
                queryObj.push({ [propertie]: value[i]})
            } else {
                queryObj.push({ [propertie]: options?.like ? {'$regex': value} : value})
            }
        }
    
        PositionLogs
            .find({$or: queryObj})
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        PositionLogs
            .find(req.query)
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

module.exports = router;