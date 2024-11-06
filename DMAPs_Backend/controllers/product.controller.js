const productType = require("../models/productType.model.js");


exports.saveProductType = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    productType.saveProductType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};

exports.getProductType = (req, res) => {
    productType.getProductType((err, data) => {
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
