const sizeGrid = function(sizeGrid) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


sizeGrid.saveSizeGrid = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_size_gridname')
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
    sql =`SELECT * FROM dmaps.map_size_gridname;`;
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
        return knex('dmaps.map_size_gridname')
        .where({ Size_Grid_Id: sizeGrid.Size_Grid_Id})
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
    const updateData = {
        Size_Grid_Id : sizeGridData.Size_Grid_Id,
        Size_Grid_Name: sizeGridData.Size_Grid_Name,
        Size_Grid_Value: sizeGridData.Size_Grid_Value,
    };

    if (!sizeGridData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_size_gridname')
        .where({ Size_Grid_Id: sizeGridData.Size_Grid_Id})
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