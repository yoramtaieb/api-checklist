const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const { Users } = require("../models");

const UnauthorizedError = require("../helpers/errors/unauthorized");

const userAttributes = ["id", "firstName", "lastName", "email", "password"];

module.exports = {
  signup: async (data) => {
    const { password } = data;
    const addUser = pick(data, userAttributes);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await Users.create({
      ...addUser,
      password: hashedPassword,
    });
    return createUser;
  },

  signin: async (email, password) => {
    const userFound = await Users.findOne({
      where: { email: email },
      attributes: userAttributes,
      logging: false,
      raw: true,
    });

    if (!userFound) {
      throw new UnauthorizedError(
        "Utilisateur non authentifié",
        "Le nom d'utilisateur n'est pas correct."
      );
    }

    const comparePassword = await bcrypt.compare(password, userFound.password);
    if (!comparePassword) {
      throw new UnauthorizedError(
        "Utilisateur non authentifié",
        "Le mot de passe n'est pas correct."
      );
    }

    const secretKey = process.env.JWT_SIGN_SECRET;
    const token = jwt.sign(
      {
        id: userFound.id,
        email: userFound.email,
      },
      secretKey,
      {
        expiresIn: "24h",
      }
    );
    return token;
  },

  checkEmail: (userEmail) => {
    return Users.findOne({
      attributes: ["email"],
      where: { email: userEmail },
    });
  },
};
