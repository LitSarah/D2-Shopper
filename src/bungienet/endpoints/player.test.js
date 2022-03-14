const {
  getBungieNetUserById,
  searchByGlobalNamePost,
  getCollectibles,
} = require("./player");

test("Search for Bungie user by ID", async () => {
  const response = await getBungieNetUserById("26920932");
  expect(response.displayName).toBe("Maegmariel");
});

test("Search for Bungie user by name", async () => {
  const response = await searchByGlobalNamePost("Maegmariel");
  expect(response[0].bungieNetMembershipId).toBe("26920932");
});

test("Get collectibles for a player", async () => {
  const response = await getCollectibles("4611686018508685170", "3");
  expect(Object.keys(response)).toContain("3556762340");
});
