const { bungie } = require("../index.js");
const { getCollectibles, collectibleStates } = require("./player.js");

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

async function membersOfGroup(groupId) {
  try {
    const { data } = await bungie.get(`/GroupV2/${groupId}/Members/`);
    const results = data.Response.results;
    const members = [];
    results.forEach((member) => {
      members.push({
        destinyMemberId: member.destinyUserInfo.membershipId,
        bungieMemberId: member.bungieNetUserInfo.membershipId,
        membershipType: member.destinyUserInfo.membershipType,
        displayName: member.bungieNetUserInfo.supplementalDisplayName,
      });
    });
    return members;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

async function memberMissingCollectibles(clanId) {
  const members = await membersOfGroup(clanId);
  // console.log(members);

  const memberCollectibles = new Array();

  for (const member in members) {
    // console.log(members[member].destinyMemberId);
    const memCollObj = await getCollectibles(
      members[member].destinyMemberId,
      members[member].membershipType,
    );
    // console.log(memCollObj);
    const memColl = Object.entries(memCollObj);
    // console.log(memColl);
    const filteredMemColl = memColl.filter(([key, value]) => {
      // console.log(value.state);
      return value.state != collectibleStates.PurchaseDisabled;
    });
    // console.log(filteredMemColl);
    const filteredMemObj = Object.fromEntries(filteredMemColl);
    const filteredMissingCollections = Object.keys(filteredMemObj);
    // console.log(filteredMissingCollections);
    const memObj = {
      memberName: members[member].displayName,
      missing: filteredMissingCollections,
    };
    memberCollectibles.push(memObj);
  }
  console.log(memberCollectibles);
}

module.exports = {
  groupSearch,
  membersOfGroup,
  memberMissingCollectibles,
};
