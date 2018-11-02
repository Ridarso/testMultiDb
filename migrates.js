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
      directory: `./migrates/${schema.schemaName}`,
      schemaName: `${schema.schemaName}_${language.lang}`,
    };

    // create decoy connection just to check schema if exists
    const knexSchema = Knex(knexConnection);
    await knexSchema.raw(`CREATE DATABASE IF NOT EXISTS ${config.schemaName}`);
    await knexSchema.destroy();

    // create actual connection for migrations
    knexConnection.connection.database = config.schemaName;
    const knex = Knex(knexConnection);
    // console.log(`config `,config);

    try {
      await knex.migrate.latest(config);
      // await knex.migrate.rollback(config);
    } catch (error) {
      console.log(error);
    } finally {
      // Dont forget to destroy
      await knex.destroy();
    }
  });
});
