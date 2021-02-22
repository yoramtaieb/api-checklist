const taskRouter = require("express").Router();
const { addTask } = require("../controllers/Tasks");
const is_auth = require("../middlewares/is_auth");
const { CREATED } = require("../helpers/status_code");

taskRouter.get("/task", (request, response) => {
  response.status(200).json({ message: "je suis la page task" });
});

taskRouter.post("/task", is_auth, async (request, response) => {
  const idList = request.params;
  console.log("===>", idList);
  const newTask = await addTask(request.body);
  return response.status(CREATED).json(newTask);
});

module.exports = taskRouter;
