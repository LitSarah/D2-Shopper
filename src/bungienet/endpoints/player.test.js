const { getBungieNetUserById } = require("./player.js");

test("Search for Bungie user Maegmariel", async () => {
  const response = await getBungieNetUserById("26920932");
  expect(response.displayName).toBe("Maegmariel");
});