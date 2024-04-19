// constructor
const StyleStore = function(companyUnit) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
const { response } = require('express');
access.DMAPFunc();

StyleStore.getStyleEntry = result => {
    sql =`SELECT se.Buyer_Group_Id,bg.Buyer_Name, se.Buyer_Order_Ref_No, LPAD(se.Style_No, 6, '0') AS Style_No, se.Style_Description, se.Size_Grid,msg.Size_Grid_Name, se.Product_Type, se.Gender, se.Season, se.Marchent_Name, se.Marchent_Contact, se.Note, se.Style_Images
    FROM dmaps.style_entry se
    LEFT JOIN dmaps.map_buyer bg ON se.Buyer_Group_Id = bg.Buyer_Id
    LEFT JOIN dmaps.map_size_gridname msg ON se.Size_Grid = msg.Size_Grid_Id`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Style_Entry'] = res;
        result(null, dataObj);
    });
};

StyleStore.saveStyleEntry = result => {
    knex.transaction(function(t) {
        return knex('dmaps.style_entry')
            .insert(data)
            .then(function(response) {
                result(null, { "result": "Style Entry are saved successfully", status: "success" });
            })
            .then(t.commit)
            .catch(t.rollback)

    })
    .catch(function(error) {
        console.log(error);
        result(null, { "result": error.sqlMessage, status: "error" });
    });
}

StyleStore.editStyleEntry = result => {
    const POData = data[0]; // Get the first item from the data array
    const updateData = {
        Buyer_Group_Id: POData.Buyer_Group_Id,
		Buyer_Order_Ref_No: POData.Buyer_Order_Ref_No,
		Season: POData.Season,
		Product_Type: POData.Product_Type,
		Gender: POData.Gender,
		Marchent_Name: POData.Marchent_Name,
		Style_Description: POData.Style_Description,
		Size_Grid: POData.Size_Grid,
		Marchent_Contact: POData.Marchent_Contact,
		Note:POData.Note,
		Style_Images : POData.Style_Images
    };

    if (!POData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.style_entry')
        .where({ Style_No: POData.Style_No })
        .update(updateData)
        .then(function(response) {
            result(null, { "result": "Style Entry are saved successfully", status: "success" });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
        result(null, { "result": error.sqlMessage, status: "error" });
    })
}

StyleStore.deleteStyleEntry = result => {
    const POData = data[0]; // Get the first item from the data array

    knex.transaction(function(t) {
        return knex('dmaps.style_entry')
        .where({ Style_No: POData.Style_No})
        .del()
        .then(function(response) {
            result(null, { "result": response });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
    })
}

StyleStore.getPODetails = result => {
    sql =`SELECT * FROM dmaps.production_order_details;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['PO_Details'] = res;
        result(null, dataObj);
    });
};

StyleStore.savePODetails = result => {
    const POData = data[0]; // Get the first item from the data array
    const insertData = {
        Style_No : POData.Style_No,
        F_PO_NO :POData.F_PO_No,
        PO_NO:POData.PO_No,
        OC_NO:POData.OC_No,
        Emb_Type: POData.Emb_Type,
        Print_Type: POData.Print_Type,
        Washing_Type: POData.Washing_Type,
        Others:POData.Others,
        Shipment_Mode : POData.Shipment_Mode,
        Delivery_Date : POData.Delivery_Date,
        PCD : POData.PCD,
        Note: POData.Note,
        Garment_Data : POData.Garment_Data
    };

    knex.transaction(function(t) {
        // Insert production order details
        return knex('dmaps.production_order_details')
            .insert(insertData)
            .then(function() {
                // Commit the transaction if both insertions are successful
                t.commit();
                result(null, { "result": "PO and garment details are saved successfully", status: "success" });
            })
            .catch(function(error) {
                // If there's an error, rollback the transaction
                t.rollback(error);
                console.log(error);
                result(null, { "result": error.sqlMessage, status: "error" });
            });
    });
}

StyleStore.editPODetails = result => {
    const POData = data[0]; // Get the first item from the data array
    const updateData = {
        Style_No : POData.Style_No,
        F_PO_NO :POData.FPO_NO,
        PO_NO:POData.PO_NO,
        OC_NO:POData.OC_NO,
        Emb_Type: POData.Emb_Type,
        Print_Type: POData.Print_Type,
        Washing_Type: POData.Washing_Type,
        Others:POData.Others,
        Shipment_Mode : POData.Shipment_Mode,
        Delivery_Date : POData.Delivery_Date,
        PCD : POData.PCD,
        Note: POData.Note,
        Garment_Data : POData.Garment_Data
    };

    if (!POData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.production_order_details')
        .where({ PO_Id: POData.PO_Id })
        .update(updateData)
        .then(function(response) {
            result(null, { "result": "PO Details are saved successfully", status: "success" });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
        result(null, { "result": error.sqlMessage, status: "error" });
    })
}

StyleStore.deletePODetails = result => {
    const POData = data[0]; // Get the first item from the data array

    knex.transaction(function(t) {
        return knex('dmaps.production_order_details')
        .where({ PO_Id: POData.PO_Id})
        .del()
        .then(function(response) {
            result(null, { "result": response });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
    })
}

module.exports = StyleStore;