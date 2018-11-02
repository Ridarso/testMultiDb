const BaseModel = require(`../base/model`);
const { Model } = require(`objection`);

class Product extends BaseModel {
  static schemaName() {
    return `master`;
  }

  static get jsonSchema() {
    return {
      type: `object`,
      properties: {
        id: {
          type: `string`,
        },
        name: {
          type: `string`,
        },
      },
    };
  }

  static mapRelations() {
    return [
      {
        targetClass: require(`./sales`),
        targetName: `sales`,
        from: `id`,
        to: `product_id`,
        relation: Model.HasManyRelation
      },
    ];
  }
}

module.exports = Product;
