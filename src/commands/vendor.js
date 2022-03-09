const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { getVendorDetailsByName } = require("../bungienet/endpoints/vendors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vendor")
    .setDescription("Replies with vendor info")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the vendor")
        .setRequired(true)
        .addChoice("Xur", "Xur")
        .addChoice("Banshee", "Banshee")
        .addChoice("Ada", "Ada"),
    ),

  async execute(interaction) {
    const response = await getVendorDetailsByName(
      interaction.options.getString("name"),
    );

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor({
        name: response.name,
        iconURL: `https://bungie.net${response.icon}`,
      })
      .setDescription(response.description)
      .setThumbnail(`https://bungie.net${response.largeIcon}`);
    interaction.reply({ embeds: [embed] });
  },
};
