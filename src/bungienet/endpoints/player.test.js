const { getBungieNetUserById, searchByGlobalNamePost } = require("./player.js");

test("Search for Bungie user by ID", async () => {
  const response = await getBungieNetUserById("26920932");
  expect(response.displayName).toBe("Maegmariel");
});

test("Search for Bungie user by name", async () => {
  const response = await searchByGlobalNamePost("Maegmariel");
  expect(response[0].bungieNetMembershipId).toBe("26920932");
});