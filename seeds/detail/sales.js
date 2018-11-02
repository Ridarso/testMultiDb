exports.seed = function(knex, Promise) {
  return knex(`sales`).del()
    .then(function () {
      return knex(`sales`).insert([
        {id: `1`, product_id: `1`, product_name: `telkom`, qty: 10},
        {id: `2`, product_id: `1`, product_name: `telkom`, qty: 12},
        {id: `3`, product_id: `2`, product_name: `indosat`, qty: 3}
      ]);
    });
};
