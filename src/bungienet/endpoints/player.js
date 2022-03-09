const { bungie } = require("../index.js");

async function getBungieNetUserById(id) {
  try {
    const { data } = await bungie.get(`/User/GetBungieNetUserById/${id}/`);
    console.log(data.Response);
    return data.Response;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

async function searchByGlobalNamePost(searchString) {
  try {
    const { data } = await bungie.post("/User/Search/GlobalName/0", {
      displayNamePrefix: searchString,
    });
    console.log(data.Response.searchResults);
    return data.Response.searchResults;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

module.exports = {
  getBungieNetUserById,
  searchByGlobalNamePost,
};
