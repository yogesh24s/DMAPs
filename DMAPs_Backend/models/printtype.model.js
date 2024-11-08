const printType = function(printType) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


printType.savePrintType = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_print_type')
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

printType.getPrintType = result => {
    sql =`SELECT * FROM dmaps.map_print_type;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['print_type'] = res;
        result(null, dataObj);
    });
};

printType.deletePrintType = result => {
    const printType = data[0]; // Get the first item from the data array
    console.log("data",printType);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_print_type')
        .where({ id: printType.id})
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


module.exports = printType;