
exports.up = knex =>
knex.schema.createTable("exames", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.text("type").notNullable();
  table.boolean("status").notNullable().defaultTo('active');
  
});

exports.down = knex => knex.schema.dropTable("exames");
