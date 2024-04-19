'use strict';

const basicDetails = require('express').Router();

var access = require('../../var.js');
var {verifyToken} = require('../Shared/jwt.js')


access.DMAPFunc();

basicDetails.use(bodyParser.json());
basicDetails.use(function (req, res, next) {
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

basicDetails.get('/api/basicDetails', verifyToken,function(req, res) {
    var sql =`
    SELECT * FROM dmaps.department;
    SELECT * FROM dmaps.designation;
    SELECT Unit_Id, Unit_Full_Name FROM dmaps.company_units;
    SELECT * FROM dmaps.state;
    SELECT * FROM dmaps.buyer_groups;
    SELECT * FROM dmaps.map_gender;
    SELECT * FROM dmaps.map_product_type;
    SELECT Size_Grid_Id, Size_Grid_Name, Size_Grid_Value FROM dmaps.map_size_gridname;
    SELECT LPAD(Style_No, 6, '0') AS Style_No, Size_Grid FROM dmaps.style_entry;
    SELECT * FROM dmaps.map_emb_type;
    SELECT * FROM dmaps.map_washing_type;
    SELECT * FROM dmaps.map_print_type;
    SELECT * FROM dmaps.map_season;
    SELECT * FROM dmaps.map_buyer;
    SELECT 
    CASE 
      WHEN MAX(Style_No) IS NULL THEN 1 
      ELSE MAX(Style_No) + 1 
    END AS Next_Style_No 
  FROM 
    dmaps.style_entry;`;

    pool.query(sql, function (err, results, fields) {
        if (!err) {
            var response = [],
                dataObj = {};
            if (results.length > 0) {
                dataObj['department'] = results[0];
                dataObj['designation'] = results[1];
                dataObj['units'] = results[2];
                dataObj['states'] = results[3];
                dataObj['buyerGroups'] = results[4];
                dataObj['gender'] = results[5];
                dataObj['productType'] = results[6];
                dataObj['sizeGrid'] = results[7];
                dataObj['styleNo'] = results[8];
                dataObj['embType'] = results[9];
                dataObj['washingType'] = results[10];
                dataObj['printType'] = results[11];
                dataObj['season'] = results[12];
                dataObj['buyer'] = results[13];
                dataObj['nextStyleNumber'] = results[14];

                response.push({ 'result': 'success', 'data': dataObj });
            } else {
                response.push({ 'result': 'error', 'msg': 'No Results Found' });
            }
            
            res.setHeader('Content-Type', 'application/json');
            // res.status(200).send(response);
            access.sendResponse(req, res, {
                status: 200,
                data: response
            });
        } else {
            res.status(400).send(err);
        }
    });
});

module.exports = basicDetails;