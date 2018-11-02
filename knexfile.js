// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: `information_schema`,
      host: `localhost`,
      user: `root`,
      password: ``,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: `_knex_migrations`
    }
  },
};
