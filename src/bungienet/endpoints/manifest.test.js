const { getManifest, destinyManifests } = require("./manifest");

test("Get DestinyInventoryItemDefinition manifest", async () => {
  const manifest = await getManifest(
    destinyManifests.DestinyInventoryItemDefinition,
  );
  expect(manifest[3549153978].displayProperties.name).toBe("Fighting Lion");
});

test("Get DestinyCollectibleDefinition manifest", async () => {
  const manifest = await getManifest(
    destinyManifests.DestinyCollectibleDefinition,
  );
  expect(manifest[3556762340].displayProperties.name).toBe(
    "Hand Cannon Dexterity",
  );
});
