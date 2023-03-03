const { query } = require('express');
const express = require('express');
const { User, Login } = require('../models/user');

const router = express.Router();

// create login
router.post('/login', (req, res) => {

    const user = req.body;
    const email = user.email;
    const password = user.password;
    
    User.findOne({ email: email, password: password})
        .then((data) => {
            const userId = data._id.toString();
            const newLogin = Login({ user: userId, token: 'newTokenTest'})
            Login.find({user: data._id})
            .then((data) => {
                    if (!data.length) {
                        console.log('first time login')
                        newLogin
                            .save(function (post, err) {
                                if (err) return next(err)
                                post['user'] = { token: newLogin.token, userId: newLogin.user }
                                res.json(201, post)
                            })
                    } else {
                        console.log('first delete login')
                        Login
                            .deleteOne({ _id: data._id })
                            .then((data) => {
                                console.log('login after delete')
                                newLogin
                                    .save(function (post, err) {
                                        if (err) return next(err)
                                        post['user'] = { tokenId: post['_id'], token: newLogin.token, userId: newLogin.user }
                                        res.json(201, post)
                                    })
                            })
                            .catch((err) => res.json({ message: err }))
                    }
                })
                .catch((err) => {
                    console.log('asd')
                })
        })
        .catch((err) => res.json({ message: 'User or password wrong' }))
});

// get logins
router.get('/login', (req,res) => {
    Login
        .find(req.query)
        .populate('user')
        .select('id token user')
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

router.get('/login/:token', (req, res) => {
    const { token } = req.params;
    Login
        .findOne({token: token})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

module.exports = router;