const { Model, transaction } = require(`objection`); // eslint-disable-line
const { main } = require(`./db`); // eslint-disable-line
const Product = require(`./model/product`); // eslint-disable-line
const Sales = require(`./model/sales`); // eslint-disable-line
const lang = `en`;
const uuid = require(`uuid/v4`);

async function select() {
  const list = await Product
    .bySchema(lang)
    .query()
    // .eagerAlgorithm(Model.JoinEagerAlgorithm)
    .eager(`sales`)
    .debug();
  console.log(list);
}

async function insertSingleLang() {
  const trx = await transaction.start(main);
  try{
    const data = {
      id: uuid(),
      name: `roa roa`,
    };
    const result = await Product.bySchema(lang).query(trx).insertAndFetch(data).debug();
    console.log(result);
    await trx.rollback();
  }
  catch (err) {
    await trx.rollback();
    throw err;
  }
}

async function insertMultiLang() {
  const trx = await transaction.start(main);
  try{
    const data = {
      id: {
        id: uuid(),
        name: `terbang`,
      },
      en: {
        id: uuid(),
        name: `fly`,
      },
    };

    const keys = Object.keys(data);
    for(let i=0 ; i<keys.length ; i++) {
      const result = await Product.bySchema(keys[i]).query(trx).insertAndFetch(data[keys[i]]).debug();
      console.log(result);
    }
    // keys.forEach(async (value) => {
    //   const result = await Product.bySchema(value).query().insertAndFetch(data[value]).debug();
    //   console.log(result);
    // });
    await trx.rollback();
  }
  catch (err) {
    await trx.rollback();
    throw err;
  }
}

async function insertGraphSingleLang() {
  const trx = await transaction.start(main);
  try{
    const data = {
      id: `5`,
      name: `wkakkaaaaa`,
      sales: {
        id: uuid(),
        product_id: `5`,
        product_name: `fly fly`,
        qty: 10
      }
    };
    const result = await Product.bySchema(lang).query(trx).insertGraph(data);
    console.log(result);
    await trx.commit();
  }
  catch (err) {
    await trx.rollback();
    throw err;
  }
}

async function insertGraphMultiLang() {
  const trx = await transaction.start(main);
  try{
    const data = {
      id: {
        id: `5`,
        name: `wkakkaaaaa`,
        sales: {
          id: uuid(),
          product_id: `5`,
          product_name: `fly fly`,
          qty: 10
        },
      },
      en: {
        id: `5`,
        name: `lolol`,
        sales: {
          id: uuid(),
          product_id: `5`,
          product_name: `fly fly`,
          qty: 10
        },
      },
    };

    const keys = Object.keys(data);
    for(let i=0 ; i<keys.length ; i++) {
      const result = await Product.bySchema(keys[i]).query(trx).insertGraph(data[keys[i]]).debug();
      console.log(result);
    }
    await trx.commit();
  }
  catch (err) {
    await trx.rollback();
    throw err;
  }
}

(async () => {
  try {
    await Model.knex(main);

    await select();
    // await insertSingleLang();
    // await insertMultiLang();
    // await insertGraphSingleLang();
    // await insertGraphMultiLang();
    
  } catch (err) {
    console.log(err);
  } finally {
    main.destroy();
  }
})();
