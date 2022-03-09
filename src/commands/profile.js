const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  getBungieNetUserById,
  convertUserResponseToEmbed,
  searchByGlobalNamePost,
} = require("../bungienet/endpoints/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Replies with Bungie profile info")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The display name of the player")
        .setRequired(true),
    ),

  async execute(interaction) {
    const response = await searchByGlobalNamePost(
      interaction.options.getString("name"),
    );
    const id = response[0].bungieNetMembershipId;
    const profile = await getBungieNetUserById(id);

    interaction.reply({ embeds: [convertUserResponseToEmbed(profile)] });
  },
};
