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


module.exports = gender;