const CompanyUsers = require("../models/user.model.js");

exports.getCompanyUsers = (req, res) => {
    console.log("test 1");

    CompanyUsers.getCompanyUsers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving assetTypes"
            });
        else
            resultData = [{ "data": [{ "result": "success", "data": data }] }];
        res.send(resultData);
    });
};

exports.saveCompanyUsers = (req, res) => {
    data = req.body;
    CompanyUsers.saveCompanyUsers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving assetTypes"
            });
        else
            resultData = [{ "data": [{ "result": "success", "data": data }] }];
        res.send(resultData);
    });
};