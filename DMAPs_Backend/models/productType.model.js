const productType = function(productType) {}
const path = require('path');
var access = require('../var.js');
access.DMAPFunc();


productType.saveProductType = result => {
    console.log("dat",data);
    knex.transaction(function(t) {
        return knex('dmaps.map_product_type')
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

productType.getProductType = result => {
    sql =`SELECT * FROM dmaps.map_product_type;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['product_type'] = res;
        result(null, dataObj);
    });
};


productType.editProductType = result => {
    const productData = data[0]; // Get the first item from the data array
    console.log('$$$$$$$', productData)
    const updateData = {
        id : productData.product_type_id,
        Product_Type: productData.product_type
    };

    if (!productData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.map_product_type')
        .where({ id: productData.product_type_id})
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


module.exports = productType;