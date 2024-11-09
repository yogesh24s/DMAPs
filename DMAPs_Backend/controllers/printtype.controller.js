const printType = require("../models/printtype.model.js");


exports.savePrintType = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    printType.savePrintType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};

exports.getPrintType = (req, res) => {
    printType.getPrintType((err, data) => {
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

exports.deletePrintType = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    printType.deletePrintType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Print type is deleted successfully", "data": data });
    });
};


exports.updatePrintType = (req, res) => {
    data = req.body;
    console.log("updatePrintType",data);
    
    printType.updatePrintType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Print type updated successfully", "data": data });
    });
};
