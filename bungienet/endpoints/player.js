const { bungie } = require("../index.js");
const { MessageEmbed } = require("discord.js");

async function getBungieNetUserById(id) {
  try {
    const { data } = await bungie.get(`/User/GetBungieNetUserById/${id}/`);
    const { Response } = data;
    console.log(Response);
    const responseEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(Response.uniqueName)
      .setThumbnail(`https://bungie.net/${Response.profilePicturePath}`)
      .addFields(
        { name: "First Created", value: Response.firstAccess },
      );
    return responseEmbed;
  }
  catch (err) {
    console.log(err);
    return "There was an error";
  }
}

module.exports = {
  getBungieNetUserById,
};