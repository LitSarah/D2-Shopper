const { bungie } = require("..");
require("dotenv").config();

const bungieManifest = require("axios").create({
  baseURL: "https://www.bungie.net/",
  headers: {
    Accept: "*/*",
    "X-API-Key": process.env.BUNGIE_TOKEN,
  },
});

bungieManifest.defaults.headers.post["Content-Type"] = "application/json";

// Important manifests:
// DestinyInventoryItemDefinition - match vendor item to collectable
// DestinyCollectibleDefinition - match vendor collectible to player collectible
// DestinyPresentationNodeDefinition - find collecible mods
const destinyManifests = {
  DestinyNodeStepSummaryDefinition: "DestinyNodeStepSummaryDefinition",
  DestinyArtDyeChannelDefinition: "DestinyArtDyeChannelDefinition",
  DestinyArtDyeReferenceDefinition: "DestinyArtDyeReferenceDefinition",
  DestinyPlaceDefinition: "DestinyPlaceDefinition",
  DestinyActivityDefinition: "DestinyActivityDefinition",
  DestinyActivityTypeDefinition: "DestinyActivityTypeDefinition",
  DestinyClassDefinition: "DestinyClassDefinition",
  DestinyGenderDefinition: "DestinyGenderDefinition",
  DestinyInventoryBucketDefinition: "DestinyInventoryBucketDefinition",
  DestinyRaceDefinition: "DestinyRaceDefinition",
  DestinyTalentGridDefinition: "DestinyTalentGridDefinition",
  DestinyUnlockDefinition: "DestinyUnlockDefinition",
  DestinySandboxPerkDefinition: "DestinySandboxPerkDefinition",
  DestinyStatGroupDefinition: "DestinyStatGroupDefinition",
  DestinyProgressionMappingDefinition: "DestinyProgressionMappingDefinition",
  DestinyFactionDefinition: "DestinyFactionDefinition",
  DestinyVendorGroupDefinition: "DestinyVendorGroupDefinition",
  DestinyRewardSourceDefinition: "DestinyRewardSourceDefinition",
  DestinyUnlockValueDefinition: "DestinyUnlockValueDefinition",
  DestinyRewardMappingDefinition: "DestinyRewardMappingDefinition",
  DestinyRewardSheetDefinition: "DestinyRewardSheetDefinition",
  DestinyItemCategoryDefinition: "DestinyItemCategoryDefinition",
  DestinyDamageTypeDefinition: "DestinyDamageTypeDefinition",
  DestinyActivityModeDefinition: "DestinyActivityModeDefinition",
  DestinyMedalTierDefinition: "DestinyMedalTierDefinition",
  DestinyAchievementDefinition: "DestinyAchievementDefinition",
  DestinyActivityGraphDefinition: "DestinyActivityGraphDefinition",
  DestinyActivityInteractableDefinition:
    "DestinyActivityInteractableDefinition",
  DestinyBondDefinition: "DestinyBondDefinition",
  DestinyCharacterCustomizationCategoryDefinition:
    "DestinyCharacterCustomizationCategoryDefinition",
  DestinyCharacterCustomizationOptionDefinition:
    "DestinyCharacterCustomizationOptionDefinition",
  DestinyCollectibleDefinition: "DestinyCollectibleDefinition",
  DestinyDestinationDefinition: "DestinyDestinationDefinition",
  DestinyEntitlementOfferDefinition: "DestinyEntitlementOfferDefinition",
  DestinyEquipmentSlotDefinition: "DestinyEquipmentSlotDefinition",
  DestinyStatDefinition: "DestinyStatDefinition",
  DestinyInventoryItemDefinition: "DestinyInventoryItemDefinition",
  DestinyInventoryItemLiteDefinition: "DestinyInventoryItemLiteDefinition",
  DestinyItemTierTypeDefinition: "DestinyItemTierTypeDefinition",
  DestinyLocationDefinition: "DestinyLocationDefinition",
  DestinyLoreDefinition: "DestinyLoreDefinition",
  DestinyMaterialRequirementSetDefinition:
    "DestinyMaterialRequirementSetDefinition",
  DestinyMetricDefinition: "DestinyMetricDefinition",
  DestinyObjectiveDefinition: "DestinyObjectiveDefinition",
  DestinyPlatformBucketMappingDefinition:
    "DestinyPlatformBucketMappingDefinition",
  DestinyPlugSetDefinition: "DestinyPlugSetDefinition",
  DestinyPowerCapDefinition: "DestinyPowerCapDefinition",
  DestinyPresentationNodeDefinition: "DestinyPresentationNodeDefinition",
  DestinyProgressionDefinition: "DestinyProgressionDefinition",
  DestinyProgressionLevelRequirementDefinition:
    "DestinyProgressionLevelRequirementDefinition",
  DestinyRecordDefinition: "DestinyRecordDefinition",
  DestinyRewardAdjusterPointerDefinition:
    "DestinyRewardAdjusterPointerDefinition",
  DestinyRewardAdjusterProgressionMapDefinition:
    "DestinyRewardAdjusterProgressionMapDefinition",
  DestinyRewardItemListDefinition: "DestinyRewardItemListDefinition",
  DestinySackRewardItemListDefinition: "DestinySackRewardItemListDefinition",
  DestinySandboxPatternDefinition: "DestinySandboxPatternDefinition",
  DestinySeasonDefinition: "DestinySeasonDefinition",
  DestinySeasonPassDefinition: "DestinySeasonPassDefinition",
  DestinySocketCategoryDefinition: "DestinySocketCategoryDefinition",
  DestinySocketTypeDefinition: "DestinySocketTypeDefinition",
  DestinyTraitDefinition: "DestinyTraitDefinition",
  DestinyTraitCategoryDefinition: "DestinyTraitCategoryDefinition",
  DestinyUnlockCountMappingDefinition: "DestinyUnlockCountMappingDefinition",
  DestinyUnlockEventDefinition: "DestinyUnlockEventDefinition",
  DestinyUnlockExpressionMappingDefinition:
    "DestinyUnlockExpressionMappingDefinition",
  DestinyVendorDefinition: "DestinyVendorDefinition",
  DestinyMilestoneDefinition: "DestinyMilestoneDefinition",
  DestinyActivityModifierDefinition: "DestinyActivityModifierDefinition",
  DestinyReportReasonCategoryDefinition:
    "DestinyReportReasonCategoryDefinition",
  DestinyArtifactDefinition: "DestinyArtifactDefinition",
  DestinyBreakerTypeDefinition: "DestinyBreakerTypeDefinition",
  DestinyChecklistDefinition: "DestinyChecklistDefinition",
  DestinyEnergyTypeDefinition: "DestinyEnergyTypeDefinition",
};

async function getManifest(destinyManifest) {
  try {
    const { data } = await bungie.get("/Destiny2/Manifest/");
    const enManifests = data.Response.jsonWorldComponentContentPaths.en;
    const manifest = enManifests[destinyManifest];

    const downloadedManifest = await bungieManifest.get(manifest);
    return downloadedManifest.data;
  } catch (err) {
    console.log(err);
    return "There was an error";
  }
}

module.exports = {
  destinyManifests,
  getManifest,
};
