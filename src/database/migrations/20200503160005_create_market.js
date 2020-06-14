
exports.up = function(knex) {
  return knex.schema.createTable('market', function (table){
      table.integer('cnpj').primary;
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.double('latitude').notNullable();
      table.double('longitude').notNullable();
      table.integer('phone').notNullable();
      table.string('city').notNullable();
      table.string('uf').notNullable();
      table.string('services').notNullable();
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('market');
};
