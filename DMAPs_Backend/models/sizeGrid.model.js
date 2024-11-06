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


module.exports = sizeGrid;