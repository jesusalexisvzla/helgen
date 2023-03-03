const { query } = require('express');
const express = require('express');
const { Buses } = require('../models/buses');

const router = express.Router();

// get buses with query
router.get('/buses?', (req, res) => { 
    console.log(req.url)
    if (req.url.length >= 7) {
        const obj = JSON.parse(decodeURI(req.url.substring(7)))
        const properties = obj.properties;
        const value = obj.value;
        const options = obj.options
        let queryObj = []
    
        for (const propertie of properties) {
            queryObj.push({ [propertie]: options['like'] ? {'$regex': value} : value})
        }
    
        Buses
            // .find({$or: [{ name: /alexis/i}, {email: /alexis/i }]})
            .find({$or: queryObj})
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        Buses
            .find(req.query)
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

module.exports = router;