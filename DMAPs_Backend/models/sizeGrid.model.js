const sizeGrid = function(sizeGrid) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


sizeGrid.saveSizeGrid = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_size_grid')
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

sizeGrid.getSizeGrid = result => {
    sql =`SELECT * FROM dmaps.map_size_grid;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['sizeGrid'] = res;
        result(null, dataObj);
    });
};

sizeGrid.deleteSizeGrid = result => {
    const sizeGrid = data[0]; // Get the first item from the data array
    console.log("data",sizeGrid);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_size_grid')
        .where({ id: sizeGrid.id})
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


sizeGrid.updateSizeGrid = result => {
    const sizeGridData = data[0]; // Get the first item from the data array
    console.log('$$$$$$$', sizeGridData)
    const updateData = {
        id : sizeGridData.id,
        Size_Grid: sizeGridData.Size_Grid
    };

    if (!sizeGridData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_size_grid')
        .where({ id: sizeGridData.id})
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


module.exports = sizeGrid;