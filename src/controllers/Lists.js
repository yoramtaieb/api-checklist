const { Lists } = require("../models/lists");
const { pick } = require("lodash");

const listsAttributes = ["id", "name"];

module.exports = {
  addList: async () => {
    const addList = pick(listsAttributes);
    const createList = await Lists.create({
      ...addList,
    });
    return createList;
  },
};
