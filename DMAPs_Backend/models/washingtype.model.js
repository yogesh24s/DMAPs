const washingType = function(washingType) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


washingType.saveWashingType = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_washing_type')
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

washingType.getWashingType = result => {
    sql =`SELECT * FROM dmaps.map_washing_type;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['washing_type'] = res;
        result(null, dataObj);
    });
};

washingType.deletewashingType = result => {
    const washingType = data[0]; // Get the first item from the data array
    console.log("data",washingType);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_washing_type')
        .where({ id: washingType.id})
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


washingType.updatewashingType = result => {
    const washingType = data[0]; // Get the first item from the data array
    console.log('$$$$$$$', washingType)
    const updateData = {
        id : washingType.id,
        Washing_Type: washingType.Washing_Type
    };

    if (!washingType) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_washing_type')
        .where({ id: washingType.id})
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



module.exports = washingType;