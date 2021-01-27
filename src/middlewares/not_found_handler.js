const NotFoundError = require("../helpers/errors/not_found_error");

module.exports = () => {
  throw new NotFoundError(
    "Ressource introuvable",
    "Désolé, nous n'avons pas trouvé la ressource demandée. Vérifiez l'URL et réessayez."
  );
};
