const { Sequelize } = require("sequelize");

// initialize sequelize
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

// Import table models
require("./models/GuildClan")(sequelize, Sequelize.DataTypes);
require("./models/ClanMembers")(sequelize, Sequelize.DataTypes);

// Add force trigger
const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    // Put in any DB initialization here

    console.log("Database synced");

    sequelize.close();
  })
  .catch(console.error);

// Clan-Guild relationship
// const GuildClans = sequelize.define("guildclans", {
//   guild: Sequelize.STRING,
//   clan: Sequelize.STRING,
// });

// module.exports = {
//   GuildClans,
// };
