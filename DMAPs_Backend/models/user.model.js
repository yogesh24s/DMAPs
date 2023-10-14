// constructor
const CompanyUsers = function(companyUsers) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
access.DMAPFunc();

CompanyUsers.getCompanyUsers = result => {
    sql =`SELECT * FROM dmaps.company_users;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Company_Users'] = res;
        result(null, dataObj);
    });
};

CompanyUsers.saveCompanyUsers = result => {
    console.log({data : data});
    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .transacting(t)
        .insert(data)
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
    

module.exports = CompanyUsers;