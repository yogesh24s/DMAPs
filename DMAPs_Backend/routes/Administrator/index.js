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
const gender = require("../../controllers/gender.controller.js");
const productType = require("../../controllers/product.controller.js");
const season = require("../../controllers/season.controller.js");
const sizeGrid = require("../../controllers/sizegrid.controller.js");
const printType = require("../../controllers/printtype.controller.js");
const embType = require("../../controllers/emb.controller.js");
const washingType = require("../../controllers/washing.controller.js");
const shipmentMode = require("../../controllers/shipmentMode.controller.js");
const country = require("../../controllers/country.controller.js");
const color = require("../../controllers/color.controller.js");

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

Administrator.post('/api/saveGender',verifyToken, gender.saveGender);
Administrator.get('/api/getGender',verifyToken, gender.getGender);
Administrator.post('/api/updateGender',verifyToken, gender.updateGender);
Administrator.post('/api/deleteGender',verifyToken, gender.deleteGender);

Administrator.post('/api/saveProductType',verifyToken, productType.saveProductType);
Administrator.get('/api/getProductType',verifyToken, productType.getProductType);
Administrator.post('/api/editProductType',verifyToken, productType.editProductType);
Administrator.post('/api/deleteProductType',verifyToken, productType.deleteProductType);


Administrator.post('/api/saveSeason',verifyToken, season.saveSeason);
Administrator.get('/api/getSeason',verifyToken, season.getSeason);
Administrator.post('/api/updateSeason',verifyToken, season.editSeason);
Administrator.post('/api/deleteSeason',verifyToken, season.deleteSeason);

Administrator.post('/api/saveSizeGrid',verifyToken, sizeGrid.saveSizeGrid);
Administrator.get('/api/getSizeGrid',verifyToken, sizeGrid.getSizeGrid);
Administrator.post('/api/deleteSizeGrid',verifyToken, sizeGrid.deleteSizeGrid);
Administrator.post('/api/updateSizeGrid',verifyToken, sizeGrid.updateSizeGrid);


Administrator.post('/api/savePrintType',verifyToken, printType.savePrintType);
Administrator.get('/api/getPrintType',verifyToken, printType.getPrintType);
Administrator.post('/api/deletePrintType',verifyToken, printType.deletePrintType);
Administrator.post('/api/updatePrintType',verifyToken, printType.updatePrintType);


Administrator.post('/api/saveWashingType',verifyToken, washingType.saveWashingType);
Administrator.get('/api/getWashingType',verifyToken, washingType.getWashingType);
Administrator.post('/api/deletewashingType',verifyToken, washingType.deletewashingType);
Administrator.post('/api/updateWashingType',verifyToken, washingType.updateWashingType);

Administrator.post('/api/saveShipmentMode',verifyToken, shipmentMode.saveShipmentMode);
Administrator.get('/api/getShipmentMode',verifyToken, shipmentMode.getShipmentMode);
Administrator.post('/api/deleteShipmentMode',verifyToken, shipmentMode.deleteShipmentMode);
Administrator.post('/api/updateShipmentMode',verifyToken, shipmentMode.updateShipmentMode);

Administrator.post('/api/saveCountry',verifyToken, country.saveCountry);
Administrator.get('/api/getCountry',verifyToken, country.getCountry);
Administrator.post('/api/deleteCountry',verifyToken, country.deleteCountry);
Administrator.post('/api/updateCountry',verifyToken, country.updateCountry);

Administrator.post('/api/saveColor',verifyToken, color.saveColor);
Administrator.get('/api/getColor',verifyToken, color.getColor);
Administrator.post('/api/deleteColor',verifyToken, color.deleteColor);
Administrator.post('/api/updateColor',verifyToken, color.updateColor);

Administrator.post('/api/saveEmbType',verifyToken, embType.saveEmbType);
Administrator.get('/api/getEmbType',verifyToken, embType.getEmbType);
Administrator.post('/api/deleteEmbType',verifyToken, embType.deleteEmbType);
Administrator.post('/api/updateEmbType',verifyToken, embType.editEmbType);


module.exports = Administrator;