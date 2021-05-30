exports.up = knex =>
  knex.schema.createTable("rel_lab_exam", table => {
    table.increments("id");
    table.integer("laboratorio_id").notNullable();
    table.integer("exame_id").notNullable();
    table
      .foreign("laboratorio_id")
      .references("id")
      .inTable("laboratorios")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table
      .foreign("exame_id")
      .references("id")
      .inTable("exames")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
  });

exports.down = knex => knex.schema.dropTable("rel_lab_exam");