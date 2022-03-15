const {
  groupSearch,
  membersOfGroup,
  memberMissingCollectibles,
} = require("./group");

test("Search for Group by name", async () => {
  const response = await groupSearch("Bank of Spira");
  expect(response[0].groupId).toBe("4443405");
});

test("Get members of a group", async () => {
  const members = await membersOfGroup("4443405");
  for (const member in members) {
    console.log(members[member].destinyMemberId);
  }
  expect(members).toContainEqual({
    destinyMemberId: "4611686018508685170",
    bungieMemberId: "26920932",
    displayName: "Maegmariel#3273",
    membershipType: 3,
  });
});

jest.setTimeout(50000);
test("Members missing collectibles", async () => {
  await memberMissingCollectibles("4443405");
});
