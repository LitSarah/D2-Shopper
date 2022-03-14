const { bungie } = require("../index.js");

const vendorHashes = {
  Xur: "2190858386",
  Banshee: "672118013",
  Ada: "350061650",
};

// Get vendors
async function getPublicVendors() {
  try {
    const { data } = await bungie.get("/Destiny2/Vendors/", {
      params: {
        components: "Vendors",
      },
    });
    const vendorsObj = data.Response.vendors.data;
    console.log(vendorsObj);
    const vendors = Object.keys(vendorsObj);
    console.log(vendors);
    return vendors;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

// Get vendor details
async function getVendorDetails(vendorId) {
  try {
    const { data } = await bungie.get(
      `/Destiny2/Manifest/DestinyVendorDefinition/${vendorId}`,
    );
    const displayProperties = data.Response.displayProperties;
    console.log(displayProperties);
    return displayProperties;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

async function getVendorDetailsByName(vendorName) {
  const vendorId = vendorHashes[vendorName];
  return await getVendorDetails(vendorId);
}

// Get what they're selling
async function getPublicVendorSales() {
  try {
    const { data } = await bungie.get("/Destiny2/Vendors/", {
      params: {
        components: "VendorSales",
      },
    });
    const salesObj = data.Response.sales.data;
    return salesObj;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

module.exports = {
  getPublicVendors,
  getVendorDetails,
  getVendorDetailsByName,
  getPublicVendorSales,
  vendorHashes,
};
