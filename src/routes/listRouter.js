const listRouter = require("express").Router();
const {
  addList,
  getAllList,
  getListByName,
  updateList,
  deleteList,
  getListById,
} = require("../controllers/Lists");
const is_auth = require("../middlewares/is_auth");

const { CREATED, OK } = require("../helpers/status_code");
const NotFoundError = require("../helpers/errors/not_found_error");

listRouter.get("/list", async (request, response) => {
  const list = await getAllList();
  response.status(OK).json(list);
});

listRouter.get("/list/search/:name", async (request, response) => {
  const list = await getListByName(request.params.name);
  if (!list) {
    throw new NotFoundError(
      "Ressource introuvable.",
      "Cette liste n'existe pas."
    );
  }
  return response.status(OK).json(list);
});

listRouter.get("/list/:id", async (request, response) => {
  const list = await getListById(request.params.id);
  if (!list) {
    throw new NotFoundError(
      "Ressource introuvable.",
      "Cette liste n'existe pas."
    );
  }
  console.log("list", list);
  return response.status(OK).json(list);
});

listRouter.post("/list", is_auth, async (request, response) => {
  const newList = await addList(request.body, request.user.userId);
  return response.status(CREATED).json(newList);
});

listRouter.put("/list/edit/:id", updateList);

listRouter.delete("/list/delete/:id", async (request, response) => {
  await deleteList(request.params.id);
  response.status(OK).json({ message: "La liste a été supprimée" });
});

module.exports = listRouter;
