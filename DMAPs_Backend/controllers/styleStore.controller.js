const StyleStore = require("../models/styleStore.model.js");

exports.getStyleEntry = (req, res) => {
    StyleStore.getStyleEntry((err, data) => {
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

exports.saveStyleEntry = (req, res) => {
    data = req.body;
    StyleStore.saveStyleEntry((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Style Entry are saved successfully", "data": data });
    });
};

exports.editStyleEntry = (req, res) => {
    data = req.body;
    StyleStore.editStyleEntry((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Style Entry are saved successfully", "data": data });
    });
};

exports.deleteStyleEntry = (req, res) => {
    data = req.body;
    StyleStore.deleteStyleEntry((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "Style Entry are deleted successfully", "data": data });
    });
};

exports.getPODetails = (req, res) => {
    StyleStore.getPODetails((err, data) => {
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

exports.savePODetails = (req, res) => {
    data = req.body;
    StyleStore.savePODetails((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "PO Details are saved successfully", "data": data });
    });
};

exports.editPODetails = (req, res) => {
    data = req.body;
    StyleStore.editPODetails((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "PO Details are saved successfully", "data": data });
    });
};

exports.deletePODetails = (req, res) => {
    data = req.body;
    StyleStore.deletePODetails((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured"
            });
        else
            res.send({ "result": "PO Details are deleted successfully", "data": data });
    });
};