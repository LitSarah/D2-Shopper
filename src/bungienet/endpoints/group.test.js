const { groupSearch, membersOfGroup } = require("./group");

test("Search for Group by name", async () => {
  const response = await groupSearch("Bank of Spira");
  expect(response[0].groupId).toBe("4443405");
});

test("Get members of a group", async () => {
  const members = await membersOfGroup("4443405");
  expect(members).toContainEqual({
    destinyMemberId: "4611686018508685170",
    bungieMemberId: "26920932",
    displayName: "Maegmariel#3273",
  });
});
