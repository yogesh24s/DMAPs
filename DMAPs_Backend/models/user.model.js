// constructor
const CompanyUsers = function(companyUsers) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
access.DMAPFunc();

// CompanyUnit.getCompanyUnits = result => {
//     sql =`SELECT * FROM dmaps.company_units;`;
//     pool.query(sql, function(err, res) {
//         if (err) {
//             result(null, err);
//             return;
//         }
//         dataObj = {};
//         dataObj['Company_Units'] = res;
//         result(null, dataObj);
//     });
// };

CompanyUsers.saveCompanyUsers = result => {
    knex.transaction(function(t) {
        return knex('dmaps.user')
        .transacting(t)
        .insert({
            Unit_Short_Name: "NBK",
            User_Id: "YOG 4",
            User_Name: "Yogesh S",
            Department_Id: "Asd",
            Designation_Id: "qwe",
            Mobile_Num: "89712222",
            Mail_Id : "a@a.com",
            Status : "Active",
            Created_Date: new Date(),
            Password : "asas",
            Login_Access : "Enabled"
        })
        .then(function(response) {
            var UserId = response;
            return knex('dmaps.user_role_permission')
            .transacting(t)
            .insert({
                User_Id : UserId,
                Model_Id : "asf",
                Unit_Id : "jhvj",
                Access_Permission : "vbk",
                Role_Id : "vjhbk"
            })
            .then(function(response) {
                result(null, { "result": "success" });
            })
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
    })

}
    

module.exports = CompanyUsers;