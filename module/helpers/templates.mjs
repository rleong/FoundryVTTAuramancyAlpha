/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/auramancy/templates/actor/parts/actor-overview.html",
    "systems/auramancy/templates/actor/parts/actor-assets.html",
    "systems/auramancy/templates/actor/parts/actor-features.html",
    "systems/auramancy/templates/actor/parts/actor-actions.html",
    "systems/auramancy/templates/actor/parts/actor-attacks.html",
    "systems/auramancy/templates/actor/parts/actor-reactions.html",
    "systems/auramancy/templates/actor/parts/actor-levels.html",
    "systems/auramancy/templates/actor/parts/actor-abilities.html",
    "systems/auramancy/templates/actor/parts/actor-misc.html",
  ]);
};
