exports.seed = function(knex, Promise) {
  return knex(`product`).del()
    .then(function () {
      return knex(`product`).insert([
        {id: `1`, name: `telkom`},
        {id: `2`, name: `indosat`},
        {id: `3`, name: `XL`}
      ]);
    });
};
