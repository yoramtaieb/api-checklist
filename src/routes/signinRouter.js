const signinRouter = require("express").Router();
const { signin } = require("../controllers/User");

const { OK } = require("../helpers/status_code");

signinRouter.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  const token = await signin(email, password);
  response.status(OK).json({ token });
});

module.exports = signinRouter;
