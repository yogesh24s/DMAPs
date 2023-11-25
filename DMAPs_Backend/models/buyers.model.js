// constructor
const CompanyBuyers = function(companyBuyers) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
access.DMAPFunc();

CompanyBuyers.getCompanyBuyers = result => {
    sql =`SELECT * FROM dmaps.buyers;`;
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
        return knex('dmaps.buyers')
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
        Buyer_Id : buyerData.BuyerId,
        Buyer_Group_Name: buyerData.Buyer_Group_Name,
        Buyer_Name: buyerData.Buyer_Name,
        Buyer_Email_Id:buyerData.Buyer_Email_Id,
        Buyer_Contact_No:buyerData.Buyer_Contact_No
    };

    if (!buyerData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.buyers')
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
        return knex('dmaps.buyers')
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