const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { groupSearch, membersOfGroup } = require("../bungienet/endpoints/group");
const { GuildClans } = require("../database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unregister")
    .setDescription("Remove a clan from being tracked on the server")
    .addStringOption((option) =>
      option
        .setName("clan")
        .setDescription("The name of the clan to remove")
        .setRequired(true),
    ),

  async execute(interaction) {
    const clanName = interaction.options.getString("clan");
    const clanResponse = await groupSearch(clanName);
    const clan = clanResponse[0];

    const membersResult = await membersOfGroup(clan.groupId);
    let members = "";
    membersResult.forEach((mem) => {
      members += `${mem.displayName}\n`;
    });

    const confirmation = new MessageActionRow().addComponents([
      new MessageButton()
        .setCustomId("remove")
        .setLabel("Yes")
        .setStyle("DANGER"),
      new MessageButton()
        .setCustomId("keep")
        .setLabel("No")
        .setStyle("SUCCESS"),
    ]);

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

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
      content: "Is this the clan you want to remove from the server?",
      components: [confirmation],
    });

    const message = await interaction.fetchReply();

    const filter = (i) => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    message
      .awaitMessageComponent({ filter, componentType: "BUTTON", time: 15000 })
      .then((action) => {
        if (action.customId == "remove") {
          GuildClans.destroy({
            where: { guild: interaction.guild.id, clan: clan.groupId },
          })
            .then(
              interaction.followUp(
                `Clan ${clan.name} was unregistered with server ${interaction.guild.name}`,
              ),
            )
            .catch((error) => {
              console.log(error);
              return interaction.followUp(
                "Something went wrong with unregistering the clan.",
              );
            });
        }
        interaction.editReply({
          content: `You decided to ${action.customId} the request.`,
          components: [],
          embeds: [],
          ephemeral: false,
        });
      })
      .catch((err) => {
        console.log(err);
        interaction.editReply("The request was denied");
      });
  },
};
