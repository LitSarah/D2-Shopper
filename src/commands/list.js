const { SlashCommandBuilder } = require("@discordjs/builders");
const { GuildClans } = require("../dbObjects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Replies with a list of clans registered to this server"),
  async execute(interaction) {
    const clanList = await GuildClans.findAll({
      attributes: ["clan"],
      where: { guild: interaction.guild.id },
    });
    const clanString =
      clanList.map((c) => c.clan).join("\n") || "No clans found";

    return interaction.reply(`List of clans:\n${clanString}`);
  },
};
