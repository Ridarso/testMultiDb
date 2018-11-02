const {
  Model,
} = require(`objection`);
const { DbErrors } = require(`objection-db-errors`);
// const uuid = require(`uuid/v4`);

class BaseModel extends DbErrors(Model) {
  static get idColumn() {
    return `id`;
  }

  static get tableName() {
    return `${this.name.charAt(0).toLowerCase()}${this.name.slice(1)}`;
  }

  static bySchema(lang) {
    return class extends this {
      static get tableName() {
        return `${super.schemaName()}_${lang}.${super.tableName}`;
      }

      static get relationMappings() {
        const relationList = [];
        super.mapRelations().map((value) => {
          /**
           * targetClass: Sales,
           * targetName: `sales`,
           * from: `id`,
           * to: `product_id`,
           * relation: Model.HasManyRelation
           */
          const mainClass = value.targetClass.bySchema(lang);
          relationList[value.targetName] = {
            relation: value.relation,
            modelClass: mainClass,
            join: {
              from: `${this.tableName}.${value.from}`,
              to: `${mainClass.tableName}.${value.to}`,
            },
          };
        });
        return relationList;
      }
    };
  }
}

module.exports = BaseModel;