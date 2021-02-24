"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idList: {
        type: Sequelize.INTEGER,
        references: {
          allowNull: false,
          model: {
            tableName: "Lists",
          },
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.STRING(180),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
