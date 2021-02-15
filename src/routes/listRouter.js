const listRouter = require("express").Router();
const { addList } = require("../controllers/Lists");

const { CREATED } = require("../helpers/status_code");

listRouter.post("/lists", async (request, response) => {
  const { name } = request.body;
  const listAdd = {
    ...request.body,
  };
  const newList = await addList(listAdd);
  return response.status(CREATED).json(newList);
});

module.exports = listRouter;
