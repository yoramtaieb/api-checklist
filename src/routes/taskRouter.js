const taskRouter = require("express").Router();
const { addTask } = require("../controllers/Tasks");
const is_auth = require("../middlewares/is_auth");
const { CREATED } = require("../helpers/status_code");

taskRouter.get("/task", (request, response) => {
  response.status(200).json({ message: "je suis la page task" });
});

taskRouter.post("/task/:listId", is_auth, async (request, response) => {
  const newTask = await addTask(request.body, request.params.listId);
  return response.status(CREATED).json(newTask);
});

module.exports = taskRouter;
