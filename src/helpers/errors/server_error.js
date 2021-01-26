const { SERVER_ERROR } = require("../status_code");

module.exports = class ServerError extends (
  Error
) {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = `ServerError: ${title}`;
    this.status = SERVER_ERROR;
    this.title = title;
    this.description = description;
  }
};
