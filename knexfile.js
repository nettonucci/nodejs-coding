module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
          filename: `${__dirname}/database/mydb.sqlite`
        },
      migrations: {
        tableName: "Knex_migrations",
        directory: `${__dirname}/database/migrations`
      }
    }
  };