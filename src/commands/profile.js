const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const {
  getBungieNetUserById,
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

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(profile.uniqueName)
      .setThumbnail(`https://bungie.net${profile.profilePicturePath}`)
      .addFields(
        { name: "First Created", value: profile.firstAccess },
        { name: "Membership ID", value: profile.membershipId },
      );

    interaction.reply({ embeds: [embed] });
  },
};
