// constructor
const CompanyBuyers = function(companyBuyers) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
access.DMAPFunc();

CompanyBuyers.getCompanyBuyers = result => {
    sql =`SELECT * FROM dmaps.map_buyer;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Company_Buyers'] = res;
        result(null, dataObj);
    });
};

CompanyBuyers.saveCompanyBuyers = result => {
    console.log(data);
    knex.transaction(function(t) {
        return knex('dmaps.map_buyer')
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

CompanyBuyers.editCompanyBuyers = result => {
    const buyerData = data[0]; // Get the first item from the data array
    const updateData = {
        Buyer_Name: buyerData.Buyer_Name
    };

    if (!buyerData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_buyer')
        .where({ Buyer_Id: buyerData.Buyer_Id})
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

CompanyBuyers.deleteCompanyBuyers = result => {
    const buyerData = data[0]; // Get the first item from the data array

    knex.transaction(function(t) {
        return knex('dmaps.map_buyer')
        .where({ Buyer_Id: buyerData.Buyer_Id})
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

module.exports = CompanyBuyers;