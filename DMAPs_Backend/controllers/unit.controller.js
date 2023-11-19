const CompanyUnit = require("../models/unit.model.js");

exports.getCompanyUnits = (req, res) => {
    CompanyUnit.getCompanyUnits((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
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
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Units are saved successfully", "data": data });
    });
};

exports.editCompanyUnits = (req, res) => {
    data = req.body;
    CompanyUnit.editCompanyUnits((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Units are saved successfully", "data": data });
    });
};

exports.deleteCompanyUnits = (req, res) => {
    data = req.body;
    CompanyUnit.deleteCompanyUnits((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Units are deelted successfully", "data": data });
    });
};