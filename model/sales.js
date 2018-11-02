const BaseModel = require(`../base/model`);
const { Model } = require(`objection`);

class Sales extends BaseModel {
  static schemaName() {
    return `detail`;
  }

  static get jsonSchema() {
    return {
      type: `object`,
      additionalProperties: false,
      properties: {
        id: {
          type: `string`,
        },
        product_id: {
          type: `string`,
        },
        product_name: {
          type: `string`,
        },
        qty: {
          type: `int`,
        },
      },
    };
  }

  static mapRelations() {
    return [
      {
        targetClass: require(`./product`),
        targetName: `product`,
        from: `product_id`,
        to: `id`,
        relation: Model.BelongsToOneRelation
      },
    ];
  }
}

module.exports = Sales;
