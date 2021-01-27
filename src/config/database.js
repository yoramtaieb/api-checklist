require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "Checklist_Dev",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "8889",
  },
};
