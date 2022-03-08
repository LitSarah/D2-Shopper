require("dotenv").config();
const bungie = require("axios").create({
  baseURL: "https://www.bungie.net/Platform",
  headers: {
    Accept: "*/*",
    "X-API-Key": process.env.BUNGIE_TOKEN,
  },
});

bungie.defaults.headers.post["Content-Type"] = "application/json";

module.exports = {
  bungie,
};
