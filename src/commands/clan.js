const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const {
  groupSearch,
  membersOfGroup,
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

    const membersResult = await membersOfGroup(clan.groupId);
    let members = "";
    membersResult.forEach((mem) => {
      members += `${mem.displayName}\n`;
    });

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(clan.name)
      .setDescription(clan.about)
      .addFields(
        { name: "Motto", value: clan.motto },
        { name: "Call Sign", value: clan.clanInfo.clanCallsign },
        { name: "Group ID", value: clan.groupId },
        { name: "Members", value: members },
      );

    interaction.reply({ embeds: [embed] });
  },
};
