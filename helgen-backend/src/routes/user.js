const { query } = require('express');
const express = require('express');
const { User, Login } = require('../models/user');

const router = express.Router();

// create user
router.post('/users', (req, res) => {
    const user = User(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// get users with query
router.get('/users?', (req, res) => { 
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
    
        User
            // .find({$or: [{ name: /alexis/i}, {email: /alexis/i }]})
            .find({$or: queryObj})
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        User
            .find(req.query)
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

// get user by id
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// update user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, isActive } = req.body;
    User
        .updateOne({ _id: id }, { $set: {name, email, password, role, isActive}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

router.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, isActive } = req.body;
    User
        .updateOne({ _id: id }, { $set: {name, email, password, role, isActive}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

module.exports = router;