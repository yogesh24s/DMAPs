// constructor
const CompanyUnit = function(companyUnit) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
access.DMAPFunc();

CompanyUnit.getCompanyUnits = result => {
    sql =`SELECT * FROM dmaps.company_units;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Company_Units'] = res;
        result(null, dataObj);
    });
};

CompanyUnit.saveCompanyUnits = result => {
    knex.transaction(function(t) {
        return knex('dmaps.company_units')
            .insert(data)
            .then(function(response) {
                result(null, { "result": "Company Unit are saved successfully", status: "success" });
            })
            .then(t.commit)
            .catch(t.rollback)

    })
    .catch(function(error) {
        console.log(error);
        result(null, { "result": error.sqlMessage, status: "error" });
    });
}

CompanyUnit.editCompanyUnits = result => {
    const unitData = data[0]; // Get the first item from the data array
    const updateData = {
        Unit_Full_Name: unitData.Unit_Full_Name,
        Unit_Short_Name: unitData.Unit_Short_Name,
        Group_Id:unitData.Group_Id,
        Division_Id:unitData.Division_Id,
        Reg_Num:unitData.Reg_Num,
        Address_Line_1:unitData.Address_Line_1,
        City:unitData.City,
        State:unitData.State,
        Pin_Code:unitData.Pin_Code,
        Contact_No:unitData.Contact_No,
        Email_Id:unitData.Email_Id,
        Tin_Num: unitData.Tin_Num
    };

    if (!unitData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.company_units')
        .where({ Unit_Id: unitData.Unit_Id, })
        .update(updateData)
        .then(function(response) {
            result(null, { "result": "Company Unit are saved successfully", status: "success" });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
        result(null, { "result": error.sqlMessage, status: "error" });
    })
}

CompanyUnit.deleteCompanyUnits = result => {
    const unitData = data[0]; // Get the first item from the data array

    knex.transaction(function(t) {
        return knex('dmaps.company_units')
        .where({ Unit_Id: unitData.Unit_Id})
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

module.exports = CompanyUnit;