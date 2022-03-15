const { bungie } = require("../index.js");
const { getManifest, destinyManifests } = require("./manifest");

const vendorHashes = {
  Xur: "2190858386",
  Banshee: "672118013",
  Ada: "350061650",
};

const summaryItemHashes = [
  // Exotic Gear (Armor)
  715326750,
  // Exotic Gear (Weapons)
  2673424576,
  // Mods TBD
];

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
    displayProperties.items = await getVendorSalesWithNames(vendorId);
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

// Get what all vendors are selling
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
// Get what a single vendor is selling
async function getVendorSales(vendorHash) {
  try {
    const { data } = await bungie.get("/Destiny2/Vendors/", {
      params: {
        components: "VendorSales",
      },
    });
    const salesObj = data.Response.sales.data;
    const salesData = Object.values(salesObj[vendorHash].saleItems);
    return salesData;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

async function getVendorCollectibles(vendorHash) {
  const vendorData = await getVendorSales(vendorHash);
  const vendorItemHashes = vendorData.map(({ itemHash }) => itemHash);

  const inventoryItemDef = await getManifest(
    destinyManifests.DestinyInventoryItemDefinition,
  );

  const allVendorCollectibles = vendorItemHashes.map((hash) => {
    return inventoryItemDef[hash].collectibleHash;
  });
  const vendorCollectibles = allVendorCollectibles.filter((hash) => {
    return hash != undefined;
  });

  return vendorCollectibles;
}

async function getVendorSalesWithNames(vendorHash) {
  const vendorData = await getVendorSales(vendorHash);
  const vendorItemHashes = vendorData.map(({ itemHash }) => itemHash);
  const inventoryItemDef = await getManifest(
    destinyManifests.DestinyInventoryItemDefinition,
  );

  const wantedVendorItems = vendorItemHashes.map((hash) => {
    if (summaryItemHashes.includes(inventoryItemDef[hash].summaryItemHash)) {
      return inventoryItemDef[hash].displayProperties.name;
    }
  });

  const vendorItems = wantedVendorItems.filter((name) => {
    return name != undefined;
  });

  return vendorItems;
}

module.exports = {
  getPublicVendors,
  getVendorDetails,
  getVendorDetailsByName,
  getPublicVendorSales,
  getVendorSales,
  getVendorSalesWithNames,
  getVendorCollectibles,
  vendorHashes,
};
