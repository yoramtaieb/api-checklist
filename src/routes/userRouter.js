const userRouter = require("express").Router();
const { signup, signin, checkEmail } = require("../controllers/User");

const { ValidationError, ConflictError } = require("../helpers/errors");
const { CREATED } = require("../helpers/status_code");
const { OK } = require("../helpers/status_code");
const { userValidation } = require("../validators");

userRouter.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  const token = await signin(email, password);
  response.status(OK).json({ token });
});

userRouter.post("/signup", async (request, response) => {
  const { email } = request.body;
  const user = request.body;

  const errors = userValidation(user);
  if (errors) throw new ValidationError(errors);

  const userFound = await checkEmail(email);
  if (userFound === null) {
    const newUser = await signup(request.body);
    response.status(CREATED).json(newUser);
  } else {
    throw new ConflictError(
      "Conflit",
      "Un utilisateur utilisant cette adresse email est déjà enregistré."
    );
  }
});

module.exports = userRouter;
