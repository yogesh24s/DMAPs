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

    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .transacting(t)
        .insert(data)
        .then(function(response) {
            // var UserId = response;
            // return knex('dmaps.user_role_permission')
            // .transacting(t)
            // .insert({
            //     User_Id : UserId,
            //     Model_Id : "asf",
            //     Unit_Id : "jhvj",
            //     Access_Permission : "vbk",
            //     Role_Id : "vjhbk"
            // })
            // .then(function(response) {
            //     result(null, { "result": "success" });
            // })
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