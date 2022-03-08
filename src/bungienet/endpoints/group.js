const { bungie } = require("../index.js");

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
    console.log(results);
    const members = [];
    results.forEach((member) => {
      members.push({
        destinyMemberId: member.destinyUserInfo.membershipId,
        bungieMemberId: member.bungieNetUserInfo.membershipId,
        displayName: member.bungieNetUserInfo.supplementalDisplayName,
      });
    });
    console.log(members);
    return members;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

module.exports = {
  groupSearch,
  membersOfGroup,
};
