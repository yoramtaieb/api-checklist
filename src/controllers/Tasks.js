const { Lists, Tasks } = require("../models");

const taskAttributes = ["id", "idList", "name", "description", "priority"];

module.exports = {
  addTask: async (data, idList) => {
    const { name, description, priority } = data;
    const newTask = await Tasks.create({
      idList: data.idList,
      name,
      description,
      priority,
    });
    const tasks = await Tasks.findByPk(newTask.id, {
      attributes: taskAttributes,
      include: [
        {
          model: Lists,
          attributes: ["id"],
        },
      ],
    });
    return tasks;
  },
};
