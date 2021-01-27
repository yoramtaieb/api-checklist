"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init(
    {
      name: DataTypes.STRING(50),
      description: DataTypes.STRING(180),
      priority: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
