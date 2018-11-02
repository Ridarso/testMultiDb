const main = require(`knex`)({
  client: `mysql2`,
  connection: {
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: ``,
    database: `information_schema`,
  },
  pool: {
    min: 2,
    max: 10,
  },
});

const schemas = [
  {
    schemaName: `master`,
  },
  {
    schemaName: `detail`,
  },
];

const languages = [
  {
    lang: `id`,
  },
  {
    lang: `en`,
  },
];

// const masterId = require(`knex`)({
//   client: `mysql2`,
//   connection: {
//     host: `localhost`,
//     port: 3306,
//     user: `root`,
//     password: ``,
//     database: `master_id`,
//   },
// });

// const masterEn = require(`knex`)({
//   client: `mysql2`,
//   connection: {
//     host: `localhost`,
//     port: 3306,
//     user: `root`,
//     password: ``,
//     database: `master_en`,
//   },
// });

// const detailId = require(`knex`)({
//   client: `mysql2`,
//   connection: {
//     host: `localhost`,
//     port: 3306,
//     user: `root`,
//     password: ``,
//     database: `detail_id`,
//   },
// });

// const detailEn = require(`knex`)({
//   client: `mysql2`,
//   connection: {
//     host: `localhost`,
//     port: 3306,
//     user: `root`,
//     password: ``,
//     database: `detail_en`,
//   },
// });

module.exports = {
  main,
  schemas,
  languages,
  // masterId,
  // masterEn,
  // detailId,
  // detailEn,
};
