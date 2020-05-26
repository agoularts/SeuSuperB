
exports.up = function(knex) {
    return knex.schema.createTable('product', function (table){ //cria a tabela
        table.increments(); //id sequencial
        table.string('img').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('category').notNullable();
        table.string('specifications').notNullable();
        table.string('brand').notNullable();
        table.string('curiosities').notNullable();
        table.string('howToBuy').notNullable();
        table.string('howToPrepare').notNullable();
        table.string('howToStore').notNullable();
        table.string('howToDiscard').notNullable();        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product'); //exclui a tabela
};
