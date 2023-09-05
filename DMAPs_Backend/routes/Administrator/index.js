'use strict';

const Administrator = require('express').Router();

// Load dependencies
const path = require('path');

var access = require('../../var.js');
access.DMAPFunc();

const companyUnit = require("../../controllers/unit.controller.js");
const companyUsers = require("../../controllers/user.controller.js")

Administrator.use(bodyParser.json()); // to support JSON-encoded bodies
Administrator.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

Administrator.use(function(req, res, next) {
     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');
     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);
     // Pass to next layer of middleware
     next();
 
});

// Unit Set Up
Administrator.get('/getCompanyUnits', companyUnit.getCompanyUnits);
Administrator.post('/saveCompanyUnits', companyUnit.saveCompanyUnits);

//User Set Up
Administrator.post('/saveCompanyUsers', companyUsers.saveCompanyUsers);
Administrator.get('/getCompanyUsers', companyUsers.getCompanyUsers);

module.exports = Administrator;