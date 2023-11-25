const CompanyBuyers = require("../models/buyers.model.js");

exports.getCompanyBuyers = (req, res) => {
    CompanyBuyers.getCompanyBuyers((err, data) => {
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

exports.saveCompanyBuyers = (req, res) => {
    data = req.body;
    CompanyBuyers.saveCompanyBuyers((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Buyers are saved successfully", "data": data });
    });
};

exports.editCompanyBuyers = (req, res) => {
    data = req.body;
    CompanyBuyers.editCompanyBuyers((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Buyers are saved successfully", "data": data });
    });
};

exports.deleteCompanyBuyers = (req, res) => {
    data = req.body;
    CompanyBuyers.deleteCompanyBuyers((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Buyers are deelted successfully", "data": data });
    });
};