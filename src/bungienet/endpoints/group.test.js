const { groupSearch } = require("./group.js");

test("Search for Group by name", async () => {
  const response = await groupSearch("Bank of Spira");
  expect(response[0].groupId).toBe("4443405");
});
