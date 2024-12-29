const country = require("../models/country.model");


exports.saveCountry = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    country.saveCountry((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Shipment Mode saved successfully", "data": data });
    });
};

exports.getCountry = (req, res) => {
    country.getCountry((err, data) => {
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

exports.deleteCountry = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    country.deleteCountry((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Shipment Mode are deleted successfully", "data": data });
    });
};


exports.updateCountry = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    country.updateCountry((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Shipment Mode updated successfully", "data": data });
    });
};