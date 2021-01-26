const { FORBIDDEN } = require("../status_code");

module.exports = class ForbiddenError extends (
  Error
) {
  constructor(
    title = "Accès interdit",
    description = "Vous n'êtes pas autorisé à accéder à cette ressource.",
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }

    this.name = `ForbiddenError: ${title}`;
    this.status = FORBIDDEN;
    this.title = title;
    this.description = description;
  }
};
