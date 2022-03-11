const { Sequelize } = require("sequelize");

// initialize sequelize
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

// Clan-Guild relationship
const GuildClans = sequelize.define("guildclans", {
  guild: Sequelize.STRING,
  clan: Sequelize.STRING,
});

module.exports = {
  GuildClans,
};
