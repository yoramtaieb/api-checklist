const bcrypt = require("bcrypt");
const fs = require("fs");
const { pick } = require("lodash");
const { Users } = require("../models");

const userAttributes = ["firstName", "lastName", "email", "password"];

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

  checkEmail: (userEmail) => {
    return Users.findOne({
      attributes: ["email"],
      where: { email: userEmail },
    });
  },
};
