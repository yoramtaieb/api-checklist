const { isNil } = require("lodash");

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const firstNameValidation = (firstName) => {
  if (isNil(firstName) || firstName === "") {
    return "Le prénom doit être renseigné.";
  }
  if (typeof firstName !== "string") {
    return "Le prénom doit être une chaîne de caractères.";
  }
  if (firstName.length < 3 || firstName.length > 50) {
    return "Le prénom doit contenir entre 3 et 50 caractères.";
  }
  return null;
};

const lastNameValidation = (lastName) => {
  if (isNil(lastName) || lastName === "") {
    return "Le nom doit être renseigné.";
  }
  if (typeof lastName !== "string") {
    return "Le nom doit être une chaîne de caractères.";
  }
  if (lastName.length < 3 || lastName.length > 50) {
    return "Le nom doit contenir entre 3 et 50 caractères.";
  }
  return null;
};

const emailValidation = (email) => {
  if (isNil(email) || email === "") {
    return "L'email doit être renseigné.";
  }
  if (typeof email !== "string") {
    return "L'email doit être une chaîne de caractères.";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "L'email doit contenir un @.";
  }
  if (email.length > 255) {
    return "L'email doit contenir moins de 255 caractères.";
  }
  return null;
};

const passwordValidation = (password) => {
  if (isNil(password) || password === "") {
    return "Le mot de passe doit être renseigné.";
  }
  if (!PASSWORD_REGEX.test(password)) {
    return "Le mot de passe doit contenir entre 8 et 20 caractère, inclure 1 lettre minuscule et majuscule, 1 chiffre, et 1 caractère spécial.";
  }
};

module.exports = (data) => {
  const { firstName, lastName, email, password } = data;
  const errors = [];

  const firstNameError = firstNameValidation(firstName);
  if (firstNameError)
    errors.push({ field: "firstName", message: firstNameError });

  const lastNameError = lastNameValidation(lastName);
  if (lastNameError) errors.push({ field: "lastName", message: lastNameError });

  const emailError = emailValidation(email);
  if (emailError) errors.push({ field: "email", message: emailError });

  const passwordError = passwordValidation(password);
  if (passwordError) errors.push({ field: "password", message: passwordError });

  return errors.length > 0 ? errors : null;
};
