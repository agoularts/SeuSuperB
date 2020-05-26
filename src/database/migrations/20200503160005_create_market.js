
exports.up = function(knex) {
    return knex.schema.createTable('market', function (table){
        table.string('cnpj').primary;
        table.string('name').notNullable();
        table.string('address').notNullable();
        table.string('phone').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
        table.string('services').notNullable();
/*
        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('user');*/
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('market');
};
