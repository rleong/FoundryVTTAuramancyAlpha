/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class AuramancyItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
    const itemData = this.data;
    const data = itemData.data;
    const flags = itemData.flags.auramancy || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareObjectData(itemData);
    this._prepareItemData(itemData);
    this._prepareAbilityData(itemData);
    this._prepareProgressionData(itemData);

  }

  /**
   * Prepare Character type specific data
   */
  _prepareItemData(itemData) {
    if (itemData.type !== 'item') return;

    // Make modifications to data here. For example:
    const data = itemData.data;
    let chatdata = this._prepareChatData(itemData);
    data.chatdata = chatdata;

    let bulk = 0;
    let bulk_value = String(data.bulk.value).toUpperCase().trim();
    switch (bulk_value) {
      case "-":
        bulk = 0;
        break;
      case "L":
        bulk = 0.1;
        break;
      case "X":
        bulk = 0;
        break;
      default:
        bulk = parseInt(bulk_value);
        if (isNaN(bulk)) {
          bulk = 0;
        }
        break;
    }

    let per_bulk = parseInt(data.bulk.per);
    if (isNaN(per_bulk)) {
      per_bulk = 1;
    }

    let quantity = parseInt(data.quantity);
    if (isNaN(quantity)) {
      quantity = 0;
    }

    data.bulk.total = (quantity / per_bulk) * bulk;

  }

  /**
   * Prepare Character type specific data
   */
  _prepareObjectData(itemData) {
    if (itemData.type !== 'object') return;

    // Make modifications to data here. For example:
    const data = itemData.data;
    let chatdata = this._prepareChatData(itemData);
    data.chatdata = chatdata;
  }

  /**
   * Prepare Character type specific data
   */
  _prepareAbilityData(itemData) {
    if (itemData.type !== 'ability') return;

    // Make modifications to data here. For example:
    const data = itemData.data;
    let chatdata = this._prepareChatData(itemData);
    data.chatdata = chatdata;
  }

  /**
   * Prepare Character type specific data
   */
  _prepareProgressionData(itemData) {
    if (itemData.type !== 'progression') return;

    // Make modifications to data here. For example:
    const data = itemData.data;
    const pool1 = CONFIG.AURAMANCY.pool1Options;
    const pool2 = CONFIG.AURAMANCY.pool2Options;
    let description_string = "";

    if(data.level !== undefined && data.level !== ""){
      description_string += `<p>Level: ${data.level}</p>`;
    }

    if(data.pool1.option !== undefined && data.pool1.option !== ""){
      description_string += `<p>Pool 1: ${pool1[data.pool1.option]}`;
    }

    if(data.pool1.choice !== undefined && data.pool1.choice !== ""){
      description_string += ` -  ${data.pool1.choice}</p>`;
    } else {
      description_string += "</p>";
    }

    if(data.pool2.option !== undefined && data.pool2.option !== ""){
      description_string += `<p>Pool 2: ${pool2[data.pool2.option]}`;
    }

    if(data.pool2.choice !== undefined && data.pool2.choice !== ""){
      description_string += ` -  ${data.pool2.choice}</p>`;
    } else {
      description_string += "</p>";
    }

    data.description = description_string;

  }

  _prepareChatData(item){
    let chatdata = [];
    // console.log(item.type);
    // console.log("------------");
    // console.log(item);
    // console.log("------------");

    if(item.type === "object"){
      // console.log("object");
      chatdata.push([`Quantity:`, ` ${item.data.details.quantity}`]);
      if (item.data.details.quality !== "") {
        chatdata.push([`Quality:`, ` ${CONFIG.AURAMANCY.quality[item.data.details.quality]}`]);
      }
      if (item.data.details.rarity !== "") {
        chatdata.push([`Rarity:`, ` ${CONFIG.AURAMANCY.rarity[item.data.details.rarity]}`]);
      }
      if (item.data.details.value !== 0 && item.data.details.value !== null) {
        chatdata.push([`Standard Value:`, ` ${item.data.details.value} Credits`]);
      }
      chatdata.push([`Bulk:`, ` ${item.data.details.bulk}`]);
      if (item.data.details.usages.max !== 0) {
        chatdata.push([`Usages:`, ` ${item.data.details.usages.value}/${item.data.details.usages.max}`]);
        chatdata.push([`Recharge:`, ` ${item.data.details.rechrage}`]);
      }
      if (item.data.combat.damage.array.length !== 0) {
        let damage_string = "";
        for(const element of item.data.combat.damage.array){
          damage_string += `${element}, `;
        }
        if(damage_string.endsWith(", ")){
          damage_string = damage_string.substring(0, damage_string.length - 2);
        }
        chatdata.push([`Damage: `, damage_string]);
      }
      if (item.data.combat.damage.proficiency !== false) {
        chatdata.push([`Proficient:`, ` Yes`]);
      }
      if (item.data.combat.subtype !== "") {
        chatdata.push([`Subtype:`, ` ${CONFIG.AURAMANCY.attackTypes[item.data.combat.subtype]}`]);
      }
      if (item.data.combat.range.distance !== "") {
        let float_range = parseFloat(item.data.combat.range.distance);
        if (isNaN(float_range)) {
          chatdata.push([`Range: `, `${item.data.combat.range.distance}`]);
        } else {
          chatdata.push([`Range: `, `${item.data.combat.range.distance}${item.data.combat.range.unit}.`]);
        }
      }
      if (item.data.stats.ac.value !== 0) {
        chatdata.push([`AC:`, ` ${item.data.stats.ac.value}`]);
      }
      if (item.data.stats.hp.max !== 0) {
        chatdata.push([`HP:`, ` ${item.data.stats.hp.value}/${item.data.stats.hp.max}`]);
      }
      if (item.data.stats.hp.buffer !== 0) {
        chatdata.push([`Buffer:`, ` ${item.data.stats.hp.buffer}/${item.data.stats.hp.min_buffer}`]);
      }
      if (item.data.stats.threshold !== 0) {
        chatdata.push([`Damage Threshold:`, ` ${item.data.stats.threshold}`]);
      }
      if (item.data.stats.size !== 0) {
        chatdata.push([`Size Category:`, ` ${CONFIG.AURAMANCY.sizeCategories[item.data.stats.size]}`]);
      }
      if (item.data.stats.movement.max !== 0) {
        chatdata.push([`Movement:`, ` ${item.data.stats.movement.value}/${item.data.stats.movement.max}`]);
        let movement_string = "";
        let units = item.data.stats.movement.units ? `${item.data.stats.movement.units}.` : "";
        for(let [k, v] of Object.entries(item.data.stats.movement.options)){
          if(k !== "special" && k !== "units" && v !== 0){

            movement_string += `${CONFIG.AURAMANCY.movementOptions[k]} (${v}${units}), `;
          }
        }
        if(item.data.stats.movement.options["special"] !== ""){
          movement_string += `${item.data.stats.movement.options["special"]}`
        }
        if(movement_string !== ""){
          if (movement_string.endsWith(", ")) {
            movement_string = movement_string.substring(0, movement_string.length - 2);
          }
          chatdata.push([`Movement Options: `, movement_string]);
        }
      }
      let tags = "";
      for (let [k, v] of Object.entries(item.data.tags)){
        for (let [sk, sv] of Object.entries(v)){
          if(sv["enabled"] === true){
            let descriptor = sv["descriptor"] === "" ? "" : ` ${sv["descriptor"]}`;
            tags += `${CONFIG.AURAMANCY.objectTags[sk]}${descriptor}, `;
          }
        }
      }
      if (tags !== ""){
        if (tags.endsWith(", ")){
          tags = tags.substring(0, tags.length - 2);
        }
        chatdata.push([`Tags: `, tags]);
      }

      // console.log(chatdata);
      // item.data.chatdata = chatdata;
    }else if (item.type === "ability"){
      let prerequisites = String(item.data.prerequisites).trim();
      if(prerequisites !== ""){
        chatdata.push([`Prerequisites: `, prerequisites]);
      }
      let prefix = item.data.category.prefix === "" || item.data.category.prefix === "none" ? "" : `${CONFIG.AURAMANCY.abilityPrefixes[item.data.category.prefix]} `;
      let source = item.data.category.other === "" ? CONFIG.AURAMANCY.abilitySources[item.data.category.source] : item.data.category.other;
      chatdata.push([`Category: `, `${prefix}${CONFIG.AURAMANCY.abilityCategories[item.data.category.category]} (${source})`]);
      if (item.data.category.category === "reaction"){
        chatdata.push([`Trigger: `, item.data.trigger]);
      }
      if (item.data.category.category === "attack") {
        if (item.data.type.subtype !== "none"){
          chatdata.push([`Type: `, `${CONFIG.AURAMANCY.attackTypes[item.data.type.type]} (${item.data.type.subtype})`]);
        } else {
          chatdata.push([`Type: `, `${CONFIG.AURAMANCY.attackTypes[item.data.type.type]}`]);
        }
      }
      if (item.data.magical.magical !== "" && item.data.magical.magical !== "no") {
        let tiers = item.data.magical.tier === "" ? "" : `Tier ${item.data.magical.tier} `;
        let school = item.data.magical.school === "" || item.data.magical.school === "none" ? "" : `${CONFIG.AURAMANCY.magicSchools[item.data.magical.school]}`;
        let components = item.data.magical.components === "" ? "" : ` - ${item.data.magical.components}`;
        let materials = item.data.magical.material === "" ? "" : `: ${item.data.magical.material}`;
        let magical = `${tiers}${school}${components}${materials}`;
        chatdata.push([`Magical: `, `${magical}`]);
      }
      if (item.data.duration.time !== "") {
        let dismiss = item.data.duration.dismissable === false ? "" : ` (${item.data.duration.dismiss} AP)`;
        chatdata.push([`Duration: `, `${item.data.duration.time}${dismiss}`]);
      }
      if (item.data.concentration === true) {
        chatdata.push([`Concentration: `, `Yes`]);
      }
      if (item.data.usages.max !== 0) {
        chatdata.push([`Usages: `, `${item.data.usages.value}/${item.data.usages.max}`]);
        chatdata.push([`Recharge: `, `${item.data.recharge}`]);
      }
      let cost = "";
      if (item.data.cost.ap !== 0 && item.data.cost.ap !== null) {
        cost += `${item.data.cost.ap} AP, `;
      }
      if (item.data.cost.charges !== 0 && item.data.cost.charges !== null) {
        cost += `${item.data.cost.charges} Aether Charges, `;
      }
      if (item.data.cost.usages !== 0 && item.data.cost.usages !== null) {
        cost += `${item.data.cost.usages} Usages, `;
      }
      if (item.data.cost.time !== 0 && item.data.cost.time !== null) {
        cost += `${item.data.cost.time}, `;
      }
      if (item.data.cost.material !== 0 && item.data.cost.material !== null) {
        cost += `${item.data.cost.material}, `;
      }
      if (item.data.cost.other !== "") {
        cost += item.data.cost.other;
      }
      if (cost !== "") {
        if (cost.endsWith(", ")){
          cost = cost.substring(0, cost.length - 2);
        }
        let ritual = item.data.cost.ritual === false ? "" : ` (Ritual)`;
        cost += ritual;
        chatdata.push([`Cost: `, cost]);
      }
      if (item.data.range.distance !== "") {
        let float_range = parseFloat(item.data.range.distance);
        if (isNaN(float_range)) {
          chatdata.push([`Range: `, `${item.data.range.distance}`]);
        } else {
          chatdata.push([`Range: `, `${item.data.range.distance}${item.data.range.unit}.`]);
        }
      }
      if (item.data.area.dimensions !== "") {
        chatdata.push([`Area: `, `${item.data.area.dimensions} ${CONFIG.AURAMANCY.shapes[item.data.area.shape]}`]);
      }

    } else if (item.type === "item") {
      chatdata.push([`Bulk:`, ` ${item.data.bulk.value} per ${item.data.bulk.per}`]);
      chatdata.push([`Quantity:`, ` ${item.data.quantity}`]);
      if (item.data.quality !== "") {
        chatdata.push([`Quality:`, ` ${CONFIG.AURAMANCY.quality[item.data.quality]}`]);
      }
      if (item.data.rarity !== "") {
        chatdata.push([`Rarity:`, ` ${CONFIG.AURAMANCY.rarity[item.data.rarity]}`]);
      }
      if (item.data.standard_value !== 0 && item.data.standard_value !== null) {
        chatdata.push([`Standard Value:`, ` ${item.data.standard_value} Credits`]);
      }
      if (item.data.usages.max !== 0) {
        chatdata.push([`Usages:`, ` ${item.data.usages.value}/${item.data.usages.max}`]);
        chatdata.push([`Recharge:`, ` ${item.data.rechrage}`]);
      }
      if (item.data.damage !== "" && item.data.damage !== null) {
        chatdata.push([`Damage:`, ` ${item.data.damage}`]);
      }
      if (item.data.range !== "" && item.data.range !== null) {
        chatdata.push([`Range:`, ` ${item.data.range}`]);
      }
      if (item.data.armor.armor === true) {
        chatdata.push([`AC Base:`, ` ${item.data.armor.ac}`]);
        chatdata.push([`Hindrance:`, ` ${item.data.armor.hindrance}`]);
      }
      let tags = "";
      for (let [k, v] of Object.entries(item.data.tags)){
        for (let [sk, sv] of Object.entries(v)){
          if(sv["enabled"] === true){
            let descriptor = sv["descriptor"] === "" ? "" : ` ${sv["descriptor"]}`;
            tags += `${CONFIG.AURAMANCY.allItemTags[sk]}${descriptor}, `;
          }
        }
      }
      if (tags !== ""){
        if (tags.endsWith(", ")){
          tags = tags.substring(0, tags.length - 2);
        }
        chatdata.push([`Tags: `, tags]);
      }

      // console.log(chatdata);
      // item.data.chatdata = chatdata;
    }else {
      return;
    }

    // console.log("---------");
    // console.log(chatdata);
    // console.log("---------");

    item.data.chatdata = chatdata;
    return chatdata;
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
   getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.data.data);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this.data;
    const actor = this.actor.data;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // Setup html
    const htmlData = {
      actor: actor,
      item: item
    }
    let html_file = "";
    switch (item.type) {
      case "object":
        html_file = "systems/auramancy/templates/chat/object-card.html";
        break;
      case "item":
        html_file = "systems/auramancy/templates/chat/item-card.html";
        break;
      case "ability":
        html_file = "systems/auramancy/templates/chat/ability-card.html";
        break;
    }
    this._prepareChatData(item);
    const html = await renderTemplate("systems/auramancy/templates/chat/item-card.html", htmlData);

    // If there's no roll data, send a chat message.
    if (!this.data.data.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        content: html
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}
