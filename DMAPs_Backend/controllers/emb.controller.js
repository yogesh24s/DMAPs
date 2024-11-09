const embType = require("../models/embtype.model.js");


exports.saveEmbType = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    embType.saveEmbType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Emb Type saved  successfully", "data": data });
    });
};

exports.getEmbType = (req, res) => {
    embType.getEmbType((err, data) => {
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

exports.deleteEmbType = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    embType.deleteEmbType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Emb type is deleted successfully", "data": data });
    });
};


exports.editEmbType = (req, res) => {
    data = req.body;
    embType.editEmbType((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Buyers are saved successfully", "data": data });
    });
};