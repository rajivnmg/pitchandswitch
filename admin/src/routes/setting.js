const router = require('express').Router();
var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
passport.authenticate('jwt', { session: false});
const settingCOntroller= require('../controllers/settingController');
router.get('/getModulesSetting',settingCOntroller.getModulesSetting);
router.post('/updateModuleSetting',settingCOntroller.updateModuleSetting);

module.exports = router;
