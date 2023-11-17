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

basicDetails.get('/api/basicDetails', function(req, res) {
    console.log({"Stage1" : "Test stage 1"});
    var sql =`
    SELECT * FROM dmaps.department;
    SELECT * FROM dmaps.designation;
    SELECT Unit_Id, Unit_Full_Name FROM dmaps.company_units;
`;

    pool.query(sql, function (err, results, fields) {
        if (!err) {
            var response = [],
                dataObj = {};
            if (results.length > 0) {
                dataObj['department'] = results[0];
                dataObj['designation'] = results[1];
                dataObj['units'] = results[2];
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