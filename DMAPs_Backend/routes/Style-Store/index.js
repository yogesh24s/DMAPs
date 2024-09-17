'use strict';

const StyleStore = require('express').Router();
const bodyParser = require('body-parser');

// Load dependencies
const path = require('path');

var access = require('../../var.js');
var {verifyToken} = require('../Shared/jwt.js')

access.DMAPFunc();


const styleStore = require("../../controllers/styleStore.controller.js");

StyleStore.use(bodyParser.json()); // to support JSON-encoded bodies
StyleStore.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


StyleStore.use(function(_req, res, next) {
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

// Style Store Set Up
StyleStore.get('/api/getStyleEntry',verifyToken, styleStore.getStyleEntry);
StyleStore.post('/api/saveStyleEntry',verifyToken, styleStore.saveStyleEntry);
StyleStore.post('/api/editStyleEntry',verifyToken, styleStore.editStyleEntry);
StyleStore.post('/api/deleteStyleEntry',verifyToken, styleStore.deleteStyleEntry);

StyleStore.post('/api/editPODetails',verifyToken, styleStore.editPODetails);
StyleStore.get('/api/getPODetails',verifyToken, styleStore.getPODetails);
StyleStore.post('/api/savePODetails',verifyToken, styleStore.savePODetails);
StyleStore.post('/api/deletePODetails',verifyToken, styleStore.deletePODetails);

StyleStore.get('/api/getStyleLookupDetails',verifyToken, styleStore.getStyleLookupDetails);


module.exports = StyleStore;