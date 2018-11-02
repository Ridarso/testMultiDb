const dbConnection = require(`./knexfile`).development;
const Knex = require(`knex`);

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
    lang: `en`,
  },
  {
    lang: `id`,
  },
];

schemas.map((schema) => {
  const knexConnection = dbConnection;

  languages.map(async (language) => {
    const config = {
      directory: `./seeds/${schema.schemaName}`,
      schemaName: `${schema.schemaName}_${language.lang}`,
    };

    // create actual connection for migrations
    knexConnection.connection.database = config.schemaName;
    // knexConnection.seeds.directory = config.directory;
    const knex = Knex(knexConnection);
    // console.log(`config `,config);

    try {
      await knex.seed.run(config);
      // await knex.migrate.rollback(config);
    } catch (error) {
      console.log(error);
    } finally {
      // Dont forget to destroy
      await knex.destroy();
    }
  });
});
