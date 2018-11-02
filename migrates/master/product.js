const TABLE_NAME = `product`;

module.exports = {
  up: (knex) => {
    return knex.schema.createTable(TABLE_NAME, (table) => {
      table.uuid(`id`).primary();
      table.string(`name`);
    });
  },

  down: (knex) => {
    return knex.schema.dropTableIfExists(TABLE_NAME);
  }
}
