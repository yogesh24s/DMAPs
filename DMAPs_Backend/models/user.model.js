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

CompanyUsers.editCompanyUsers = result => {
    console.log({"result":data[0].Unit_Short_Name});
    const userData = data[0]; // Get the first item from the data array
    const updateData = {
        User_Name: userData.User_Name,
        User_Employee_Id: userData.User_Employee_Id,
        User_Login_ID: userData.User_Login_ID,
        Department_Id: userData.Department_Id,
        Designation_Id: userData.Designation_Id,
        Mobile_Num: userData.Mobile_Num,
        Mail_Id: userData.Mail_Id,
        status: userData.status,
        User_Role: userData.User_Role,
    };

    if (!userData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .where({ User_Employee_Id: userData.User_Employee_Id })
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