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
