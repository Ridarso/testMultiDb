const TABLE_NAME = `sales`;

module.exports = {
  up: (knex) => {
    return knex.schema.createTable(TABLE_NAME, (table) => {
      table.uuid(`id`).primary();
      table.string(`product_id`);
      table.string(`product_name`);
      table.string(`qty`);
    });
  },

  down: (knex) => {
    return knex.schema.dropTableIfExists(TABLE_NAME);
  }
}
