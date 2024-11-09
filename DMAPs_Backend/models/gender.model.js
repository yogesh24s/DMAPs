const gender = function(gender) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


gender.saveGender = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_gender')
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

gender.getGender = result => {
    sql =`SELECT * FROM dmaps.map_gender;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['gender'] = res;
        result(null, dataObj);
    });
};


gender.editGender = result => {
    const GenderData = data[0]; // Get the first item from the data array
    console.log('$$$$$$$', GenderData)
    const updateData = {
        id : GenderData.id,
        Gender: GenderData.Gender
    };

    if (!GenderData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_gender')
        .where({ id: GenderData.id})
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

gender.deleteGender = result => {
    const sizeGrid = data[0]; // Get the first item from the data array
    console.log("data",sizeGrid);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_gender')
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


module.exports = gender;