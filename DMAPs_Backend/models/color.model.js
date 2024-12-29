const color = function(color) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


color.saveColor = result => {
    knex.transaction(function(t) {
        return knex('dmaps.map_garment_color')
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

color.getColor = result => {
    sql =`SELECT * FROM dmaps.map_garment_color;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Color'] = res;
        result(null, dataObj);
    });
};

color.deleteColor = result => {
    const color = data[0]; // Get the first item from the data array
    console.log("data",color);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_garment_color')
        .where({ id: color.id})
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


color.updateColor = result => {
    const color = data[0]; // Get the first item from the data array
    const updateData = {
        id : color.id,
        Color_Name: color.Color_Name,
        Color_Code : color.Color_Code
    };

    if (!color) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_garment_color')
        .where({ id: color.id})
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



module.exports = color;