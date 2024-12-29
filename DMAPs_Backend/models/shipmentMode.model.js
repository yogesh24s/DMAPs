const shipmentMode = function(shipmentMode) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


shipmentMode.saveShipmentMode = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_shipment_mode')
            .insert(data)
            .then(function(response) {
                result(null, { "result": response });
            })
            .then(t.commit)
            .catch(t.rollback)

    })
    .catch(function(error) {
        console.log(error);
    });
}

shipmentMode.getShipmentMode = result => {
    sql =`SELECT * FROM dmaps.map_shipment_mode;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Shipment_Mode'] = res;
        result(null, dataObj);
    });
};

shipmentMode.deleteShipmentMode = result => {
    const shipmentMode = data[0]; // Get the first item from the data array
    console.log("data",shipmentMode);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_shipment_mode')
        .where({ id: shipmentMode.id})
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


shipmentMode.updateShipmentMode = result => {
    const shipmentMode = data[0]; // Get the first item from the data array
    const updateData = {
        id : shipmentMode.id,
        Shipment_name: shipmentMode.Shipment_Name
    };

    if (!shipmentMode) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_shipment_mode')
        .where({ id: shipmentMode.id})
        .update(updateData)
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



module.exports = shipmentMode;