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

exports.editProductType = (req, res) => {
    data = req.body;
    productType.editProductType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Buyers are saved successfully", "data": data });
    });
};

exports.deleteProductType = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    productType.deleteProductType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Size  Grid are deleted successfully", "data": data });
    });
};