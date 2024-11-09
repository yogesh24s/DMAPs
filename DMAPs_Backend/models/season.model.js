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


season.updateSeason = result => {
    const seasonData = data[0]; // Get the first item from the data array
    console.log('$$$$$$$', seasonData)
    const updateData = {
        id : seasonData.id,
        Season_Name: seasonData.Season_Name
    };

    if (!seasonData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_season')
        .where({ id: seasonData.id})
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

module.exports = season;