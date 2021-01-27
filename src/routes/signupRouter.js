const signupRouter = require("express").Router();
const { signup, checkEmail } = require("../controllers/User");

const { ValidationError, ConflictError } = require("../helpers/errors");
const { CREATED } = require("../helpers/status_code");
const { userValidation } = require("../validators");

signupRouter.post("/signup", async (request, response) => {
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
      "Un utilisateur utilisant cette adresse email est déjà enregistré"
    );
  }
});

module.exports = signupRouter;
