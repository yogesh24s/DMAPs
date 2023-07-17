const CompanyUnit = require("../models/unit.model.js");

exports.getCompanyUnits = (req, res) => {
    console.log("test 1");

    CompanyUnit.getCompanyUnits((err, data) => {
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

exports.saveCompanyUnits = (req, res) => {
    data = req.body;
    CompanyUnit.saveCompanyUnits((err, data) => {
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