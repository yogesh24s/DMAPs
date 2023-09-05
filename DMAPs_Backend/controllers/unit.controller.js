const CompanyUnit = require("../models/unit.model.js");

exports.getCompanyUnits = (req, res) => {
    CompanyUnit.getCompanyUnits((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured while retrieving assetTypes"
            });
        else {
            res.send(data);
        }
           
    });
};

exports.saveCompanyUnits = (req, res) => {
    data = req.body;
    CompanyUnit.saveCompanyUnits((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured while retrieving assetTypes"
            });
        else
            res.send({ "result": "Company Units are saved successfully", "data": data });
    });
};