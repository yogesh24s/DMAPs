const embType = function(embtype) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


embType.saveEmbType = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_emb_type')
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

embType.getEmbType = result => {
    sql =`SELECT * FROM dmaps.map_emb_type;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['emb_type'] = res;
        result(null, dataObj);
    });
};

embType.deleteEmbType = result => {
    const embType = data[0]; // Get the first item from the data array
    console.log("data",embType);
    
    knex.transaction(function(t) {
        return knex('dmaps.map_emb_type')
        .where({ id: embType.id})
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



embType.editEmbType = result => {
    const EmbTypeData = data[0]; // Get the first item from the data array
    console.log('$$$$$$$', EmbTypeData)
    const updateData = {
        id : EmbTypeData.id,
        Emb_Type: EmbTypeData.emb_type
    };

    if (!EmbTypeData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_emb_type')
        .where({ id: EmbTypeData.id})
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


module.exports = embType;