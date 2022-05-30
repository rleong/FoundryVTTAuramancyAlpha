/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class AuramancyActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as attribute modifiers rather than attribute scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.auramancy || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);

    // Data check
    //

    // Carrying Capacity
    data.traits.carrying_capacity.value = Math.min(1, (5 + data.traits.carrying_capacity.mod + data.attributes.str.value));
    data.traits.carrying_capacity.max = 10 + data.attributes.str.value;

    // Movement Speed
    data.stats.movement.max = CONFIG.AURAMANCY.sizeCategoryMovement[data.traits.size] + data.stats.movement.temp + data.stats.movement.ancestry_mod + data.stats.movement.mod;
    data.stats.movement.value = Math.max(0, Math.min(data.stats.movement.value, data.stats.movement.max));

    // Armor class
    data.stats.ac.value = 8 + data.stats.ac.temp + data.stats.ac.mod + Math.min(data.attributes.agi.value, data.stats.ac.cap) + data.stats.ac.armor;

    // Proficiency
    data.stats.proficiency.value = 1 + Math.ceil(data.auramancy.level/4);
    data.stats.proficiency.save = 10 + data.stats.proficiency.value;

    // AP
    data.ap.max = 3 + data.ap.temp;

    // Aether well
    data.auramancy.charges.max = Math.max(0, 3 + (data.auramancy.level * 3)) + data.auramancy.charges.temp;

    // HP
    data.health.hp.max = CONFIG.AURAMANCY.minHp[data.health.reserve.die] + ((data.auramancy.level) * data.attributes.con.value) + ((data.auramancy.level-1) * data.health.reserve.die);
    data.health.reserve.max = Math.max(0, data.auramancy.level * 2);

    // Attributes
    data.attributes.str.min = -5 + data.attributes.str.min_mod;
    data.attributes.str.max = 5 + data.attributes.str.max_mod;
    data.attributes.str.value = Math.min(data.attributes.str.max, Math.max(data.attributes.str.min, data.attributes.str.value));
    data.attributes.str.passive = 10 + data.attributes.str.value + data.attributes.str.passive_mod;

    data.attributes.agi.min = -5 + data.attributes.agi.min_mod;
    data.attributes.agi.max = 5 + data.attributes.agi.max_mod;
    data.attributes.agi.value = Math.min(data.attributes.agi.max, Math.max(data.attributes.agi.min, data.attributes.agi.value));
    data.attributes.agi.passive = 10 + data.attributes.agi.value + data.attributes.agi.passive_mod;

    data.attributes.dex.min = -5 + data.attributes.dex.min_mod;
    data.attributes.dex.max = 5 + data.attributes.dex.max_mod;
    data.attributes.dex.value = Math.min(data.attributes.dex.max, Math.max(data.attributes.dex.min, data.attributes.dex.value));
    data.attributes.dex.passive = 10 + data.attributes.dex.value + data.attributes.dex.passive_mod;

    data.attributes.con.min = -5 + data.attributes.con.min_mod;
    data.attributes.con.max = 5 + data.attributes.con.max_mod;
    data.attributes.con.value = Math.min(data.attributes.con.max, Math.max(data.attributes.con.min, data.attributes.con.value));
    data.attributes.con.passive = 10 + data.attributes.con.value + data.attributes.con.passive_mod;

    data.attributes.int.min = -5 + data.attributes.int.min_mod;
    data.attributes.int.max = 5 + data.attributes.int.max_mod;
    data.attributes.int.value = Math.min(data.attributes.int.max, Math.max(data.attributes.int.min, data.attributes.int.value));
    data.attributes.int.passive = 10 + data.attributes.int.value + data.attributes.int.passive_mod;

    data.attributes.wil.min = -5 + data.attributes.wil.min_mod;
    data.attributes.wil.max = 5 + data.attributes.wil.max_mod;
    data.attributes.wil.value = Math.min(data.attributes.wil.max, Math.max(data.attributes.wil.min, data.attributes.wil.value));
    data.attributes.wil.passive = 10 + data.attributes.wil.value + data.attributes.wil.passive_mod;

    data.attributes.per.min = -5 + data.attributes.per.min_mod;
    data.attributes.per.max = 5 + data.attributes.per.max_mod;
    data.attributes.per.value = Math.min(data.attributes.per.max, Math.max(data.attributes.per.min, data.attributes.per.value));
    data.attributes.per.passive = 10 + data.attributes.per.value + data.attributes.per.passive_mod;

    data.attributes.cha.min = -5 + data.attributes.cha.min_mod;
    data.attributes.cha.max = 5 + data.attributes.cha.max_mod;
    data.attributes.cha.value = Math.min(data.attributes.cha.max, Math.max(data.attributes.cha.min, data.attributes.cha.value));
    data.attributes.cha.passive = 10 + data.attributes.cha.value + data.attributes.cha.passive_mod;
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const data = actorData.data;

    // Loop through attribute scores, and add their modifiers to our sheet output.
    for (let [key, attribute] of Object.entries(data.attributes)) {
      // Calculate the modifier using d20 rules.
      attribute.mod = Math.floor((attribute.value - 10) / 2);
    }
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const data = actorData.data;
    data.xp = (data.cr * data.cr) * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.data.type !== 'character') return;

    // Copy the attribute scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.attributes) {
      for (let [k, v] of Object.entries(data.attributes)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.properties.level) {
      data.lvl = data.properties.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.data.type !== 'npc') return;

    // Process additional NPC data here.
  }

}
