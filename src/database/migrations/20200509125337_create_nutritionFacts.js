
exports.up = function(knex) {
    return knex.schema.createTable('nutritionFacts', function (table){ 
        table.string('portion').notNullable();
        table.string('calories').notNullable();
        table.string('carbohidrate').nullable();
        table.string('protein').nullable();
        table.string('totalFat').nullable();
        table.string('saturatedFat').nullable();
        table.string('transFat').nullable();
        table.string('cholesterol').nullable();
        table.string('dietaryFiber').nullable();
        table.string('sodium').nullable();
        table.string('vitamins').nullable();
        table.string('vitB1').nullable();
        table.string('vitB2').nullable();
        table.string('vitB6').nullable();
        table.string('calcium').nullable();
        table.string('iron').nullable();
        table.string('niacin').nullable();
        table.string('panthotenicAcid').nullable();
        table.string('folicAcid').nullable();
        table.string('sugar').nullable();
        table.string('monounsaturatedFat').nullable();

        table.string('product_id').primary;

        table.foreign('product_id').references('id').inTable('product');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('nutritionFacts');
};
