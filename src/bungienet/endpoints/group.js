const { bungie } = require("../index.js");
const { MessageEmbed } = require("discord.js");

async function groupSearch(searchString) {
  try {
    const { data } = await bungie.post("/GroupV2/Search", {
      name: searchString,
      groupType: 1,
    });
    console.log(data.Response.results);
    return data.Response.results;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

function convertGroupResponseToEmbed(response) {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(response.name)
    .setDescription(response.about)
    .addFields(
      { name: "Motto", value: response.motto },
      { name: "Call Sign", value: response.clanInfo.clanCallsign },
      { name: "Group ID", value: response.groupId },
    );
}

module.exports = {
  groupSearch,
  convertGroupResponseToEmbed,
};
