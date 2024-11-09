const gender = require("../models/gender.model.js");


exports.saveGender = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    gender.saveGender((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};

exports.getGender = (req, res) => {
    gender.getGender((err, data) => {
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


exports.updateGender = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    gender.editGender((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};

exports.deleteGender = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    gender.deleteGender((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Size  Grid are deleted successfully", "data": data });
    });
};