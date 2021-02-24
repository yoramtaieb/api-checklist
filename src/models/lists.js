"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tasks, {
        foreignKey: {
          name: "idList",
        },
      });
      this.belongsTo(models.Users, {
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  Lists.init(
    {
      name: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "Lists",
    }
  );
  return Lists;
};
