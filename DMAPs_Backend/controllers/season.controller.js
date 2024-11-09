const season = require("../models/season.model.js");


exports.saveSeason = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    season.saveSeason((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "gender saved  successfully", "data": data });
    });
};

exports.getSeason = (req, res) => {
    season.getSeason((err, data) => {
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


exports.editSeason = (req, res) => {
    data = req.body;
    season.updateSeason((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Company Buyers are saved successfully", "data": data });
    });
};

exports.deleteSeason = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    season.deleteSeason((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Size  Grid are deleted successfully", "data": data });
    });
};