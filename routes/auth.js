var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require("../models/user");

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true,
                    token: 'JWT ' + token, 
                    user: {
                      id: user._id,
                      email: user.email,
                      username: user.username
                    }
                  });
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

/* UPDATE USERNAME */
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, user) {
    if (err) throw err;
    res.json(user);
  });
});

/* GET USER */
router.get('/usershit', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    User.find(function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
module.exports = router;
