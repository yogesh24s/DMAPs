const season = function(season) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


season.saveSeason = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_season')
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

season.getSeason = result => {
    sql =`SELECT * FROM dmaps.map_season;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['season'] = res;
        result(null, dataObj);
    });
};


module.exports = season;