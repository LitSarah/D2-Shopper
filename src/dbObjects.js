const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

// Import table models
const GuildClans = require("./models/GuildClan")(
  sequelize,
  Sequelize.DataTypes,
);
const ClanMembers = require("./models/ClanMembers")(
  sequelize,
  Sequelize.DataTypes,
);

// Setup key relationships with .belongsTo()

// Define cross-table commands with Reflect.defineProperty()

module.exports = {
  GuildClans,
  ClanMembers,
};
