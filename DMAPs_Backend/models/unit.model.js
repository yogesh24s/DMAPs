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
        return knex('company_units')
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

module.exports = CompanyUnit;