const { find } = require("lodash");
const { Lists, Tasks } = require("../models");

const taskAttributes = ["id", "idList", "name", "description"];

module.exports = {
  addTask: async (data, id) => {
    const findList = await Lists.findOne({ where: { id } });
    const { name, description } = data;
    const newTask = await Tasks.create({
      idList: findList.id,
      name,
      description,
    });
    const tasks = await Tasks.findByPk(newTask.id, {
      attributes: taskAttributes,
      include: [
        {
          model: Lists,
          attributes: ["id", "name"],
        },
      ],
    });
    return tasks;
  },
};
