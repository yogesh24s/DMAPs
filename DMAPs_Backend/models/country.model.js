const country = function(country) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


country.saveCountry = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_country')
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

country.getCountry = result => {
    sql =`SELECT * FROM dmaps.map_country;`;
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

country.deleteCountry = result => {
    const country = data[0]; // Get the first item from the data array
    console.log("data",country);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_country')
        .where({ id: country.id})
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


country.updateCountry = result => {
    const country = data[0]; // Get the first item from the data array
    const updateData = {
        id : country.id,
        Country_Name: country.Country_Name
    };

    if (!country) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_country')
        .where({ id: country.id})
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



module.exports = country;