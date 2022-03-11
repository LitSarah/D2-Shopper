require("dotenv").config();
const { GuildClans } = require("../database");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    if (process.env.TEST_ENV == "true") {
      GuildClans.sync({ force: true });
    } else {
      GuildClans.sync();
    }
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
