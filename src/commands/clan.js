const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  groupSearch,
  convertGroupResponseToEmbed,
} = require("../bungienet/endpoints/group.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clan")
    .setDescription("Replies with clan info")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The display name of the clan")
        .setRequired(true),
    ),

  async execute(interaction) {
    const response = await groupSearch(interaction.options.getString("name"));
    const clan = response[0];

    interaction.reply({ embeds: [convertGroupResponseToEmbed(clan)] });
  },
};
