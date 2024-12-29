const shipmentMode = require("../models/shipmentMode.model");


exports.saveShipmentMode = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    shipmentMode.saveShipmentMode((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Shipment Mode saved successfully", "data": data });
    });
};

exports.getShipmentMode = (req, res) => {
    shipmentMode.getShipmentMode((err, data) => {
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

exports.deleteShipmentMode = (req, res) => {
    data = req.body;
    console.log("data contorller",data);
    
    shipmentMode.deleteShipmentMode((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Shipment Mode are deleted successfully", "data": data });
    });
};


exports.updateShipmentMode = (req, res) => {
    data = req.body;
    console.log("LINE 6",data);
    
    shipmentMode.updateshipmentMode((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Shipment Mode updated successfully", "data": data });
    });
};