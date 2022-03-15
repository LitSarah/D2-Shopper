const {
  getPublicVendors,
  getVendorDetails,
  vendorHashes,
  getVendorDetailsByName,
  getPublicVendorSales,
  getVendorSalesWithNames,
  getVendorCollectibles,
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

test("Get what a vendor is selling", async () => {
  const exoticEngram = 3875551374;
  const response = await getPublicVendorSales();
  const saleItems = Object.values(response[vendorHashes.Xur].saleItems);
  expect(saleItems).toContainEqual(
    expect.objectContaining({
      itemHash: exoticEngram,
    }),
  );
});

test("Get item names of what a vendor is selling", async () => {
  const response = await getVendorSalesWithNames(vendorHashes.Xur);
  expect(response).toContain("Hawkmoon");
});

test("Get collectible hashes for a vendor's items", async () => {
  const response = await getVendorCollectibles(vendorHashes.Xur);
  expect(response).toContain(653763964);
});
