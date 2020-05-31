
exports.up = function(knex) {
    return knex.schema.createTable('favorites', function (table){
        table.increments().primary; 

        table.string('product_id').primary;
        table.foreign('product_id').references('id').inTable('product');
        
        table.string('user_id').primary;
        table.foreign('user_id').references('id').inTable('product');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('favorites');
};
