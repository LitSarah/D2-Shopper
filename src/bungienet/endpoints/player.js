const { bungie } = require("../index.js");

const collectibleStates = {
  None: 0,
  NotAcquired: 1,
  Obscured: 2,
  Invisible: 4,
  CannotAffordMaterialRequirements: 8,
  InventorySpaceUnavailable: 16,
  UniquenessViolation: 32,
  // aka the player has the collectible
  PurchaseDisabled: 64,
};

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

async function getCollectibles(destinyMembershipId, membershipType) {
  try {
    const { data } = await bungie.get(
      `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`,
      { params: { components: "Collectibles" } },
    );
    return data.Response.profileCollectibles.data.collectibles;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

module.exports = {
  getBungieNetUserById,
  searchByGlobalNamePost,
  getCollectibles,
  collectibleStates,
};
