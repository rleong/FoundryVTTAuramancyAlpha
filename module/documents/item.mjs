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
    this._prepareAbilityData(itemData);
    this._prepareProgressionData(itemData);

  }

  /**
   * Prepare Character type specific data
   */
  _prepareObjectData(itemData) {
    if (itemData.type !== 'object') return;

    // Make modifications to data here. For example:
    const data = itemData.data;

  }

  /**
   * Prepare Character type specific data
   */
  _prepareAbilityData(itemData) {
    if (itemData.type !== 'ability') return;

    // Make modifications to data here. For example:
    const data = itemData.data;

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

    if(item.type === "object"){
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
        chatdata.push([`Range:`, ` ${item.data.combat.range.distance}${item.data.combat.range.unit}.`]);
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

      // console.log(chatdata);
      item.data.chatdata = chatdata;
    }else if (item.type === "ability"){


      // console.log(chatdata);
      item.data.chatdata = chatdata;
    }

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
