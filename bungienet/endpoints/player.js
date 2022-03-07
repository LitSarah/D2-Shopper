const { bungie } = require("../index.js");
const { MessageEmbed } = require("discord.js");

async function getBungieNetUserById(id) {
  try {
    const { data } = await bungie.get(`/User/GetBungieNetUserById/${id}/`);
    console.log(data.Response);
    return data.Response;
  }
  catch (err) {
    console.log(err);
    return "There was an error";
  }
}

function convertUserResponseToEmbed(response) {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(response.uniqueName)
    .setThumbnail(`https://bungie.net/${response.profilePicturePath}`)
    .addFields(
      { name: "First Created", value: response.firstAccess },
    );
}

module.exports = {
  getBungieNetUserById,
  convertUserResponseToEmbed,
};