const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', function (req, res) {
    User.create({
        username: req.body.user.username,
        passwordhash: bcrypt.hashSync(req.body.user.password)
    })
    .then(function createSuccess(user) {
        let token = jwt.sign({id: user.id}, "helloThere", {expiresIn: 60*60*24});
        res.json({
            user: user,
            message: "User successfully created",
            sessionToken: token
        });
    })
    .catch(function(err){
        res.status(500).json({error: err})
    });
});

router.post('/login', function(req, res) {
    User.findOne({ where: { username: req.body.user.username } }).then(function loginSuccess(user) {
        if(user) {
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: user.id}, "helloThere", {expiresIn: 60*60*24});
                    res.status(200).json({user: user, message: "User successfully logged in!", sessionToken: token});
                } else {
                    res.status(500).send({error: "Login failed"});
                }
            });
        } else {
            res.status(500).send('User does not exist');
        }
    }) .catch(function (err) {
        res.status(500).json({ error: err });
    });
});

module.exports = router;