const { bungie } = require("../index.js");

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

// Get what they're selling

module.exports = {
  getPublicVendors,
};
