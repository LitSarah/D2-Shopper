const {
  getPublicVendors,
  getVendorDetails,
  vendorHashes,
  getVendorDetailsByName,
} = require("./vendors");

test("Get list of vendor hashes", async () => {
  const response = await getPublicVendors();
  expect(response).toContain(vendorHashes.Xur);
});

test("Get details of vendor", async () => {
  const response = await getVendorDetails(vendorHashes.Xur);
  expect(response.subtitle).toBe("Agent of the Nine");
});

test("Get details of vendor by Name", async () => {
  const response = await getVendorDetailsByName("Xur");
  expect(response.subtitle).toBe("Agent of the Nine");
});
