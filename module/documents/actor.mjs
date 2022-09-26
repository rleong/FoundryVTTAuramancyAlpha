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
    data.traits.carrying_capacity.current = this._getCurrentBulk(actorData.items, data.traits.carrying_capacity.current);
    data.traits.carrying_capacity.value = Math.max(1, (data.traits.carrying_capacity.default_carry + data.traits.carrying_capacity.default_carry_mod + data.traits.carrying_capacity.mod + data.attributes.str.value));
    data.traits.carrying_capacity.max = ((data.traits.carrying_capacity.default_carry + data.traits.carrying_capacity.default_carry_mod) * 2) + data.attributes.str.value + data.traits.carrying_capacity.mod;

    // Movement Speed
    data.stats.movement.max = CONFIG.AURAMANCY.sizeCategoryMovement[data.traits.size] + data.stats.movement.temp + data.stats.movement.ancestry_mod + data.stats.movement.mod;
    data.stats.movement.value = Math.max(0, Math.min(data.stats.movement.value, data.stats.movement.max));

    // Proficiency
    data.stats.proficiency.value = 1 + Math.ceil(data.auramancy.level/4);
    data.stats.proficiency.save = 10 + data.stats.proficiency.value;
    this.getProficiencyDie(actorData);

    // AP
    data.ap.min = 2 + Math.ceil(data.auramancy.level / 4)
    data.ap.temp = Math.max(0, data.ap.value - data.ap.min);

    // Aether well
    data.auramancy.charges.max = Math.max(0, (3 + data.auramancy.charges.mod + (data.auramancy.level * 3))) + data.auramancy.charges.temp;

    // HP
    data.health.hp.max = CONFIG.AURAMANCY.minHp[data.health.reserve.die] + ((data.auramancy.level) * data.attributes.con.value) + ((data.auramancy.level-1) * data.health.reserve.die) + data.health.hp.mod;
    data.health.reserve.max = Math.max(0, (data.auramancy.level * 2) + data.health.reserve.mod);

    // currency
    data.currency.credits = Math.max(0, data.currency.credits);
    data.currency.tokens.value = Math.max(0, data.currency.tokens.value);

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

    // Armor class
    this.getAC(actorData);

    // Strain
    data.health.strain.mental.max = Math.max(4, data.attributes.int.value + data.attributes.wil.value + data.attributes.per.value + data.attributes.cha.value);
    data.health.strain.physical.max = Math.max(4, data.attributes.str.value + data.attributes.agi.value + data.attributes.dex.value + data.attributes.con.value);

    // Magic
    data.abilities.magic.tier = Math.ceil(data.auramancy.level / 2);

    // EXP
    data.auramancy.exp.available = data.auramancy.exp.total - data.auramancy.exp.expended;

  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const data = actorData.data;

    if (data.stats.ac.unarmored_base === null || data.stats.ac.unarmored_base === "undefined") {
      data.stats.ac.unarmored_base = 8;
    }

  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const data = actorData.data;
  }

  getAC(actorData) {
    const data = actorData.data;
    const items = actorData.items;
    let ac_base = 0;
    let ac_hindrance = 99;
    let hindrance_x = false;
    for (const item of items) {
      try {
        if (item.type === "item") {
          if (item.data.data.tags.item.equipment.enabled === true && item.data.data.equipped === true && item.data.data.armor.armor === true) {
            ac_base += item.data.data.armor.ac;
            // console.log(`ac_base: ${ac_base}`);
            if (item.data.data.armor.hindrance < ac_hindrance && item.data.data.armor.hindrance !== 0){
              ac_hindrance = item.data.data.armor.hindrance;
            }
            if (String(item.data.data.tags.armor.hindrance.descriptor).toUpperCase().trim() === "X") {
              hindrance_x = true;
            }
          }
        }
      }
      catch(e) {
       console.log(`Error: ${e}`);
      }
    }
    if (ac_hindrance === 99){
      ac_hindrance = 0;
    }
    if (ac_base === 0) {
      ac_base = data.stats.ac.unarmored_base;
    }
    let agi_bonus = data.attributes.agi.value;
    if (ac_hindrance !== 0) {
      agi_bonus = Math.min(data.attributes.agi.value, ac_hindrance);
    }
    if (hindrance_x === true) {
      agi_bonus = 0;
    }
    data.stats.ac.base = ac_base;
    data.stats.ac.value = data.stats.ac.base + data.stats.ac.temp + data.stats.ac.mod + agi_bonus;
    console.log(`ac_base: ${ac_base}`);
    console.log(`data.stats.ac.base: ${data.stats.ac.base}`);
    console.log(`ac_hindrance: ${ac_hindrance}`);
    console.log(`agi_bonus: ${agi_bonus}`);
    console.log(`data.stats.ac.temp: ${data.stats.ac.temp}`);
    console.log(`data.stats.ac.mod: ${data.stats.ac.mod}`);
  }

  getProficiencyDie(actorData) {
    const data = actorData.data;
    if (data.auramancy.level <= 20) {
      data.stats.proficiency.die_amount = 1;
    } else {
      data.stats.proficiency.die_amount = 1 + Math.ceil((data.auramancy.level - 20) / 4);
    }
    if (data.auramancy.level <= 4) {
      data.stats.proficiency.die = 4;
    } else if (data.auramancy.level >= 5 && data.auramancy.level <= 8) {
      data.stats.proficiency.die = 6;
    } else if (data.auramancy.level >= 9 && data.auramancy.level <= 12) {
      data.stats.proficiency.die = 8;
    } else if (data.auramancy.level >= 13 && data.auramancy.level <= 16) {
      data.stats.proficiency.die = 10;
    } else {
      data.stats.proficiency.die = 12;
    }
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
    if (data.auramancy.level) {
      data.lvl = data.auramancy.level ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.data.type !== 'npc') return;

    // Process additional NPC data here.
  }

  _getCurrentBulk(data, current_bulk){
    let total_bulk = current_bulk;
    for(const item of data){
      if(item.type === "item"){
        let bulk = item.data.data.bulk.total;
        total_bulk += bulk;
      }
    }
    return parseFloat((total_bulk).toFixed(2));
  }

}
