const CompanyUsers = require("../models/user.model.js");

exports.getCompanyUsers = (req, res) => {

    CompanyUsers.getCompanyUsers((err, data) => {
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

exports.saveCompanyUsers = (req, res) => {
    data = req.body;
    CompanyUsers.saveCompanyUsers((err, data) => {
        if (err) {
            res.send({
                message:
                    err.message || "Some error occured"
            });
        }
        else {
            res.send({ "result": "Company Users are saved successfully", "data": data });
        }
    });
};
exports.editCompanyUsers = (req, res) => {
    data = req.body;
    CompanyUsers.editCompanyUsers((err, data) => {
        if (err) {
            res.send({
                message:
                    err.message || "Some error occured"
            });
        }
        else {
            res.send({ "result": "Company Users are saved successfully", "data": data });
        }
    });
};

exports.deleteCompanyUsers = (req, res) => {
    data = req.body;
    CompanyUsers.deleteCompanyUsers((err, data) => {
        if (err) {
            res.send({
                message:
                    err.message || "Some error occured"
            });
        }
        else {
            res.send({ "result": "Company Users are deleted successfully", "data": data });
        }
    });
};
