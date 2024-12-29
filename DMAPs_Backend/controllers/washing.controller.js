const washingType = require("../models/washingtype.model.js");


exports.saveWashingType = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    washingType.saveWashingType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Washing saved  successfully", "data": data });
    });
};

exports.getWashingType = (req, res) => {
    washingType.getWashingType((err, data) => {
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

exports.deletewashingType = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    washingType.deletewashingType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Washing type are deelted successfully", "data": data });
    });
};


exports.updateWashingType = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    washingType.updatewashingType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Washing type updated successfully", "data": data });
    });
};