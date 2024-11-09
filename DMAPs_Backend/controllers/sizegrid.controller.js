const sizeGrid = require("../models/sizeGrid.model.js");


exports.saveSizeGrid = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    sizeGrid.saveSizeGrid((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};

exports.getSizeGrid = (req, res) => {
    sizeGrid.getSizeGrid((err, data) => {
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

exports.deleteSizeGrid = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    sizeGrid.deleteSizeGrid((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Size  Grid are deleted successfully", "data": data });
    });
};


exports.updateSizeGrid = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    sizeGrid.updateSizeGrid((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};
