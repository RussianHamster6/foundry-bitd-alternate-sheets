/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {}
 */
export const preloadHandlebarsTemplates = function () {
  // Define template paths to load
  const templatePaths = [
    // Actor Sheet Partials
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/coins.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/attributes.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/harm.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/load.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/radiotoggles.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/ability.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/item.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/item-header.html",
    // "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/turf-list.html",
    // "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/cohort-block.html",
    // "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/factions.html",
    "modules/bitd-alternate-sheets-deepcuts-edition/templates/parts/active-effects.html",
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};
