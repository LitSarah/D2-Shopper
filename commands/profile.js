require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getBungieNetUserById } = require("../bungienet/endpoints/player.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Replies with Bungie profile info")
    .addStringOption(option =>
      option.setName("id")
        .setDescription("The membership ID of the player")
        .setRequired(true)),
  async execute(interaction) {
    interaction.reply(
      { embeds: [await getBungieNetUserById(interaction.options.getString("id"))] },
    );
  },
};
