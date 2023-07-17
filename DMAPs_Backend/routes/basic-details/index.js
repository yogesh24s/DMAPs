'use strict';

const basicDetails = require('express').Router();

var access = require('../../var.js');
access.DMAPFunc();

basicDetails.use(bodyParser.json());
basicDetails.use(function(req, res, next) {
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

basicDetails.get('/basicDetails', function(req, res) {
    var sql =`
    SELECT * FROM dmaps.department;
    SELECT * FROM dmaps.designation;
    `;
    pool.query(sql, function(err, rows, fields) {
        if (!err) {
            var response = [],
                dataObj = {};
            if (rows.length != 0) {
                dataObj['department'] = rows[0];
                dataObj['designation'] = rows[1];
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