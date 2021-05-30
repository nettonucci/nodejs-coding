
exports.up = knex =>
knex.schema.createTable("laboratorios", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.text("address").notNullable();
  table.boolean("status").notNullable().defaultTo('active');
  
});

exports.down = knex => knex.schema.dropTable("laboratorios");
