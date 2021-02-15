const router = require("express").Router();
const { OK } = require("../helpers/status_code");
require("express-async-errors");

const userRouter = require("./userRouter");
const listRouter = require("./listRouter");

router.get("/", (request, response) => {
  response.status(OK).json({ message: "je suis la page d'accueil" });
});

router.use(userRouter);
router.use(listRouter);

module.exports = router;
