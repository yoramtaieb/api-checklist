module.exports = (error, request, response, next) => {
  const { title, errors } = error;
  let { description, message } = error;

  const status = error.status || 500;
  if (status == 500) {
    description = "Serveur cassé. Revenez plus tard.";
  }

  if (error.name === "ValidationError") {
    response.status(status).json({
      message,
      errors,
    });
  } else {
    response.status(status).json({
      title,
      description,
    });
  }
};
