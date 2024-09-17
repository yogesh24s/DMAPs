'use strict';

const Administrator = require('express').Router();
const bodyParser = require('body-parser');

// Load dependencies
const path = require('path');

var access = require('../../var.js');
var {verifyToken} = require('../Shared/jwt.js')

access.DMAPFunc();

const companyUnit = require("../../controllers/unit.controller.js");
const companyUsers = require("../../controllers/user.controller.js")
const companyBuyers = require("../../controllers/buyers.controller.js");

Administrator.use(bodyParser.json()); // to support JSON-encoded bodies
Administrator.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


Administrator.use(function(_req, res, next) {
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
Administrator.get('/api/getCompanyUnits',verifyToken, companyUnit.getCompanyUnits);
Administrator.post('/api/saveCompanyUnits',verifyToken, companyUnit.saveCompanyUnits);
Administrator.post('/api/editCompanyUnits',verifyToken, companyUnit.editCompanyUnits);
Administrator.post('/api/deleteCompanyUnits',verifyToken, companyUnit.deleteCompanyUnits);
//User Set Up
Administrator.post('/api/saveCompanyUsers',verifyToken, companyUsers.saveCompanyUsers);
Administrator.get('/api/getCompanyUsers',verifyToken, companyUsers.getCompanyUsers);
Administrator.post('/api/editCompanyUsers',verifyToken, companyUsers.editCompanyUsers);
Administrator.post('/api/deleteCompanyUsers',verifyToken, companyUsers.deleteCompanyUsers);

Administrator.get('/api/getBuyers',verifyToken, companyBuyers.getCompanyBuyers);
Administrator.post('/api/saveBuyers',verifyToken, companyBuyers.saveCompanyBuyers);
Administrator.post('/api/editBuyers',verifyToken, companyBuyers.editCompanyBuyers);
Administrator.post('/api/deleteBuyers',verifyToken, companyBuyers.deleteCompanyBuyers);

module.exports = Administrator;