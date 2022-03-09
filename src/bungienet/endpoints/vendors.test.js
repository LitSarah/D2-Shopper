const { getPublicVendors } = require("./vendors");

test("Get list of vendor hashes", async () => {
  const response = await getPublicVendors();
  expect(response).toContain("2190858386");
});
