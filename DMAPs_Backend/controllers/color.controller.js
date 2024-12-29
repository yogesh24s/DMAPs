const color = require("../models/color.model");


exports.saveColor = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    color.saveColor((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Color saved successfully", "data": data });
    });
};

exports.getColor = (req, res) => {
    color.getColor((err, data) => {
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

exports.deleteColor = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    color.deleteColor((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Color are deleted successfully", "data": data });
    });
};


exports.updateColor = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    color.updateColor((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Color updated successfully", "data": data });
    });
};