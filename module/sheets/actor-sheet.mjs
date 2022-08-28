import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";
import ActorSensoriesConfig from "../apps/sensories-config.js";
import ActorDamageStatsConfig from "../apps/damage-stats-config.js";
import ActorMovementConfig from "../apps/movement-config.js";
import ActorBoxSelectorConfig from "../apps/box-selector.js";
import ActorProfBoxSelectorConfig from "../apps/prof-box-selector.js";
import ActorCharacteristicsConfig from "../apps/characteristics.js";
import ActorProficienciesConfig from "../apps/proficiencies-selector.js";
import ActorConditionsConfig from "../apps/conditions-config.js";
import ItemCard from "../apps/item-card.js";


/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class AuramancyActorSheet extends ActorSheet {
  constructor(...args) {
    super(...args);

    /**
     * Track the set of item filters which are applied
     * @type {Set}
     */
    this._filters = {
      inventory: new Set(),
      default_abilities: new Set(),
      abilities: new Set(),
      equipment: new Set(),
      effects: new Set()
    };
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["auramancy", "sheet", "actor"],
      template: "systems/auramancy/templates/actor/actor-sheet.html",
      width: 700,
      height: 800,
      tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "overview" }]
    });
  }

  /** @override */
  get template() {
    return `systems/auramancy/templates/actor/actor-${this.actor.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // const data = {
    // };

    // Use a safe clone of the actor data for further operations.
    const actorData = this.actor.data.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = actorData.data;
    context.flags = actorData.flags;
    context.config = CONFIG.AURAMANCY;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(this.actor.effects);

    // sensories
    context.sensories = this._getSensories(actorData);

    // movement
    context.movement = this._getMovement(actorData);

    // proficiencies
    context.proficiencies = this._getProficiencies(actorData);

    // calculations
    context.data = this._calculateAllData(actorData);

    // Filters
    context.filters = this._filters;

    // calculations
    context.conditions = this._getConditions(actorData);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
    // Handle attribute scores.
    for (let [k, v] of Object.entries(context.data.attributes)) {
      v.label = game.i18n.localize(CONFIG.AURAMANCY.attributes[k]) ?? k;
    }
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const abilities = [];
    const default_abilities = [];
    const inventory = [];
    const equipment = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to abilities.
      if (i.type === 'ability') {
        if (i.data.category.source === "default") {
          default_abilities.push(i);
        } else {
          abilities.push(i);
        }
      }
      // Append to inventory.
      else if (i.type === 'item') {
        this._prepareItemToggleState(i);
        if (i.data.tags.item.equipment.enabled === true) {
          equipment.push(i);
        } else {
          inventory.push(i);
        }
      }
    }

    // async getDefaultAbilities();

    // Assign and return
    context.abilities = abilities;
    context.filtered_abilities = this._filterItems(abilities, this._filters.abilities, "abilities");
    context.default_abilities = default_abilities;
    context.filtered_default_abilities = this._filterItems(default_abilities, this._filters.default_abilities, "default_abilities");
    context.inventory = inventory;
    context.filtered_inventory = this._filterItems(inventory, this._filters.inventory, "inventory");
    context.equipment = equipment;
    context.filtered_equipment = this._filterItems(equipment, this._filters.equipment, "equipment");
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Activate Item Filters
    const filterLists = html.find(".filter-list");
    filterLists.each(this._initializeFilterItemList.bind(this));
    filterLists.on("click", ".filter-item", this._onToggleFilter.bind(this));

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Item summaries
    html.find(".item .item-name.rollable h4").click(event => this._onItemSummary(event));

    // Item State Toggling
    html.find(".item-toggle").click(this._onToggleItem.bind(this));

    // Item State Toggling
    html.find(".item-info").click(this._onToggleItemInfo.bind(this));

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // -------------------------------------------------------------
    //
    // Configure Turn Reset
    html.find(".turn-reset").click(this._restTurn.bind(this));

    html.find(".increase-level").click(this._increaseLevel.bind(this));

    html.find(".decrease-level").click(this._decreaseLevel.bind(this));

    html.find(".increase-ap").click(this._increaseAP.bind(this));

    html.find(".decrease-ap").click(this._decreaseAP.bind(this));


    // -------------------------------------------------------------
    //
    // Configure Special Flags
    html.find(".config-button").click(this._onConfigMenu.bind(this));

    // Trait Selector
    html.find(".trait-selector").click(this._onTraitSelector.bind(this));

    // Damage Selector
    html.find(".damage-selector").click(this._onDamageSelector.bind(this));

    // Damage Selector
    html.find(".box-selector").click(this._onBoxSelector.bind(this));

    // Damage Selector
    html.find(".prof-box-selector").click(this._onProfBoxSelector.bind(this));

    // Damage Selector
    html.find(".characteristics-selector").click(this._onCharacteristicsSelector.bind(this));

    // Damage Selector
    html.find(".proficiencies-selector").click(this._onProficienciesSelector.bind(this));

    // Conditions
    html.find(".conditions-config").click(this._onConditionsConfig.bind(this));

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Item Rolling
    html.find(".rollable .item-image").click(event => this._onItemRoll(event));

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

    // Rollable attributes.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }

  _prepareItemToggleState(item) {
    if (item.type === "item") {
      const isAttuned = item.data.attunement.attuned;
      const isEquipped = item.data.equipped;
      item.toggleAttune = isAttuned ? "active" : "";
      item.toggleAttuneTitle = isAttuned ? "Attuned" : "Not Attuned";
      item.toggleEquip = isEquipped ? "active" : "";
      item.toggleEquipTitle = isEquipped ? "Equipped" : "Not Equipped";
    }
  }

  _onToggleItem(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const name = event.currentTarget.name;
    const item = this.actor.items.get(itemId);
    const actor = this.actor.data.data;

    if(name==="attune"){

      const value = !item.data.data.attunement.attuned;
      if(value === false){
        let attunement_value = actor.stats.attunement.value - 1  >= 0 ? actor.stats.attunement.value - 1 : 0;
        this.actor.update({["data.stats.attunement.value"]: attunement_value});
        return item.update({["data.attunement.attuned"]: value});
      } else {
        let attunement_value = actor.stats.attunement.value;
        if(attunement_value < actor.stats.attunement.max){
          attunement_value += 1;
          this.actor.update({["data.stats.attunement.value"]: attunement_value});
          return item.update({["data.attunement.attuned"]: value});
        } else {
          ui.notifications.warn("You cannot attune to anymore items.");
        }
      }
    }else if (name==="equip"){
      const value = !item.data.data.equipped;
      return item.update({["data.equipped"]: value});
    }
  }

  _onToggleItemInfo(event){
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const name = event.currentTarget.name;
    const item = this.actor.items.get(itemId);
    const actor = this.actor.data.data;

    // Setup html
    const options = {
      actor: actor,
      item: item
    }

    return new ItemCard(this.object, options).render(true);
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[attribute] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  /* -------------------------------------------- */

  /**
   * Initialize Item list filters by activating the set of filters which are currently applied
   * @param {number} i  Index of the filter in the list.
   * @param {HTML} ul   HTML object for the list item surrounding the filter.
   * @private
   */
  _initializeFilterItemList(i, ul) {
    const set = this._filters[ul.dataset.filter];
    const filters = ul.querySelectorAll(".filter-item");
    for ( let li of filters ) {
      if ( set.has(li.dataset.filter) ) li.classList.add("active");
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle toggling of filters to display a different set of owned items.
   * @param {Event} event     The click event which triggered the toggle.
   * @returns {ActorSheet5e}  This actor sheet with toggled filters.
   * @private
   */
  _onToggleFilter(event) {
    event.preventDefault();
    const li = event.currentTarget;
    const set = this._filters[li.parentElement.dataset.filter];
    // console.log(set);
    const filter = li.dataset.filter;
    // console.log(filter);
    if ( set.has(filter) ) set.delete(filter);
    else set.add(filter);
    return this.render();
  }

  _filterItems(data, filters, type) {

    if(filters.size !== 0){
      let filtered_data = [];

      for (const element of data){
        // console.log(element);
        if(type === "abilities"){
          if (filters.has(element.data.category.category)) {
            // console.log("Yes");
            if (!filtered_data.includes(element)) filtered_data.push(element);
          }
        } else if(type === "default_abilities"){
          if (filters.has(element.data.category.category)) {
            // console.log("Yes");
            if (!filtered_data.includes(element)) filtered_data.push(element);
          }
        } else if (type === "inventory"){
          if (filters.has("attunement") && element.data.attunement.required === true) {
            if (!filtered_data.includes(element)) filtered_data.push(element);
          }
          if (filters.has("equipped") && element.data.equipped === true) {
            if (!filtered_data.includes(element)) filtered_data.push(element);
          }
        } else if (type === "equipment"){
          if (filters.has("attunement") && element.data.attunement.required === true) {
            if (!filtered_data.includes(element)) filtered_data.push(element);
          }
          if (filters.has("equipped") && element.data.equipped === true) {
            if (!filtered_data.includes(element)) filtered_data.push(element);
          }
        } else {

        }

      }

      return filtered_data;

    } else {

      return data;
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle toggling and items expanded description.
   * @param {Event} event   Triggering event.
   * @private
   */
  _onItemSummary(event) {
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("item-id"));

    // Toggle summary
    if ( li.hasClass("expanded") ) {
      let summary = li.children(".item-summary");
      summary.slideUp(200, () => summary.remove());
    } else {
      let div = $(`<div class="item-summary" style="text-align: left;">${item.data.data.description}</div>`);
      if(item.data.data.tags !== undefined){
        // console.log("tags");
        let props = $('<div class="item-properties"></div>');
        let item_tags = this._getItemTags(item.data.data);
        item_tags.forEach(p => props.append(`<span class="tag">${p}</span>`));
        div.append(props);
      }
      li.append(div.hide());
      div.slideDown(200);
    }
    li.toggleClass("expanded");
  }

  /**
   * Handle rolling an item from the Actor sheet, obtaining the Item instance, and dispatching to its roll method.
   * @param {Event} event  The triggering click event.
   * @returns {Promise}    Results of the roll.
   * @private
   */
  _onItemRoll(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);
    if ( item ) return item.roll();
  }

  _getItemTags(data){
    const robustness = data.tags.robustness || {};
    const substance = data.tags.substance || {};
    const special = data.tags.special || {};
    const traits = data.tags.traits || {};
    const misc = data.tags.misc || {};
    const object_tags = CONFIG.AURAMANCY.objectTags;
    const tags = [];

    // console.log(robustness);

    for ( let [k, v] of Object.entries(robustness) ) {
      if (v.enabled === true) {
        let tag = `${object_tags[k]}`;
        if (v.descriptor !== ""){
          tag += ` ${v.descriptor}`;
        }
        tags.push(tag);
      }
    }

    for ( let [k, v] of Object.entries(substance) ) {
      if (v.enabled === true) {
        let tag = `${object_tags[k]}`;
        if (v.descriptor !== ""){
          tag += ` ${v.descriptor}`;
        }
        tags.push(tag);
      }
    }

    for ( let [k, v] of Object.entries(special) ) {
      if (v.enabled === true) {
        let tag = `${object_tags[k]}`;
        if (v.descriptor !== ""){
          tag += ` ${v.descriptor}`;
        }
        tags.push(tag);
      }
    }

    for ( let [k, v] of Object.entries(traits) ) {
      if (v.enabled === true) {
        let tag = `${object_tags[k]}`;
        if (v.descriptor !== ""){
          tag += ` ${v.descriptor}`;
        }
        tags.push(tag);
      }
    }

    for ( let [k, v] of Object.entries(misc) ) {
      if (v.enabled === true) {
        let tag = `${object_tags[k]}`;
        if (v.descriptor !== ""){
          tag += ` ${v.descriptor}`;
        }
        tags.push(tag);
      }
    }

    // console.log(tags);

    return tags;
  }

  _onConditionsConfig(event) {
    event.preventDefault();

    return new ActorConditionsConfig(this.object).render(true);
  }

  _getConditions(actorData) {
    const conditions = CONFIG.AURAMANCY.conditions;
    const tags = [];
    for ( let [k, v] of Object.entries(actorData.data.health.conditions) ) {
      if(v.enabled === true){
        tags.push(conditions[k]);
      }
    }
    return tags;
  }

  _calculateAllData(actorData) {
    let data = actorData.data;

    let ap_dots = [];
    for(let i = 0; i < Math.min(3, data.ap.value); i++){
      ap_dots.push("active");
    }
    for(let i = 0; i < 3-data.ap.value; i++){
      ap_dots.push("inactive");
    }
    if(data.ap.temp > 0){
      for(let i = 0; i < Math.min(data.ap.temp, data.ap.value - 3); i++){
        ap_dots.push("temp");
      }
    }

    data.ap.dots = ap_dots;

    return data;
  }

  _restTurn(actorData) {
    const update_data = {};
    update_data['data.stats.movement.value'] = this.object.data.data.stats.movement.max;
    update_data['data.ap.value'] = this.object.data.data.ap.max;
    update_data['data.health.buffer.value'] = Math.max(this.object.data.data.health.buffer.value, this.object.data.data.health.buffer.min);
    this.object.update(update_data);
  }

  _increaseLevel(actorData) {
    const update_data = {};
    let new_level = this.object.data.data.auramancy.level + 1;
    update_data['data.auramancy.level'] = new_level;
    this.object.update(update_data);
  }

  _decreaseLevel(actorData) {
    const update_data = {};
    let new_level = Math.max(1, this.object.data.data.auramancy.level - 1);
    update_data['data.auramancy.level'] = new_level;
    this.object.update(update_data);
  }

  _increaseAP(actorData) {
    const update_data = {};
    let new_ap = Math.min(this.object.data.data.ap.max, this.object.data.data.ap.value + 1);
    update_data['data.ap.value'] = new_ap;
    this.object.update(update_data);
  }

  _decreaseAP(actorData) {
    const update_data = {};
    let new_ap = Math.max(0, this.object.data.data.ap.value - 1);
    update_data['data.ap.value'] = new_ap;
    this.object.update(update_data);
  }

  /**
   * Prepare sensories object for display.
   * @param {object} actorData  Copy of actor data being prepared for display.
   * @returns {object}          sensories grouped by key with localized and formatted string.
   * @protected
   */
  _getSensories(actorData) {
    const sensories = actorData.data.traits.sensories || {};
    const tags = {};
    for ( let [k, label] of Object.entries(CONFIG.AURAMANCY.sensories) ) {
      const v = sensories[k] ?? 0;
      if ( v === 0 ) continue;
      tags[k] = `${label}: ${v} ${sensories.units}`;
    }
    if ( sensories.special ) tags.special = sensories.special;
    return tags;
  }

  /**
   * Prepare sensories object for display.
   * @param {object} actorData  Copy of actor data being prepared for display.
   * @returns {object}          sensories grouped by key with localized and formatted string.
   * @protected
   */
  _getMovement(actorData) {
    const movement = actorData.data.traveling.movement_options || {};
    const tags = {};
    for ( let [k, label] of Object.entries(CONFIG.AURAMANCY.movementOptions) ) {
      const v = movement[k] ?? 0;
      if ( v === 0 ) continue;
      tags[k] = `${label}: ${v} ${movement.units}`;
    }
    if ( movement.special ) tags.special = movement.special;
    return tags;
  }

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param {Event} event      The click event which originated the selection.
   * @returns {TraitSelector}  Newly displayed application.
   * @private
   */
  _onTraitSelector(event) {
    event.preventDefault();
    // const a = event.currentTarget;
    // const label = a.parentElement.querySelector("label");
    // const choices = CONFIG.DND5E[a.dataset.options];
    // const options = { name: a.dataset.target, title: `${label.innerText}: ${this.actor.name}`, choices };
    return new ActorDamageStatsConfig(this.actor).render(true);
  }

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param {Event} event      The click event which originated the selection.
   * @returns {TraitSelector}  Newly displayed application.
   * @private
   */
  _onDamageSelector(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    const damage_types = CONFIG.AURAMANCY.damageTypes;
    const damage_subtypes = CONFIG.AURAMANCY.damageSubtypes;
    const options = { damage_types, damage_subtypes, name };
    return new ActorDamageStatsConfig(this.object, options).render(true);
  }

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param {Event} event      The click event which originated the selection.
   * @returns {TraitSelector}  Newly displayed application.
   * @private
   */
  _onBoxSelector(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    let available_options = {};
    let current_values = [];
    let data_name = "";

    if (name === "Tags") {
      current_values = this.object.data.data.traits.tags;
      available_options = CONFIG.AURAMANCY.entityTags;
      data_name = "data.traits.tags";
    } else if (name === "Favored Terrain") {
      current_values = this.object.data.data.traveling.favored_terrain;
      available_options = CONFIG.AURAMANCY.favoredTerrain;
      data_name = "data.traveling.favored_terrain";
    } else if (name === "Favored Enemies") {
      current_values = this.object.data.data.traveling.favored_enemies;
      available_options = CONFIG.AURAMANCY.favoredEnemies;
      data_name = "data.traveling.favored_enemies";
    } else if (name === "Comfortable Climates") {
      current_values = this.object.data.data.traveling.climate;
      available_options = CONFIG.AURAMANCY.comfortableClimates;
      data_name = "data.traveling.climate";
    } else if (name === "Comfortable Temperatures") {
      current_values = this.object.data.data.traveling.temperature;
      available_options = CONFIG.AURAMANCY.comfortableTemperatures;
      data_name = "data.traveling.temperature";
    } else if (name === "Conditional Immunities") {
      current_values = this.object.data.data.traits.conditional_immunities;
      available_options = CONFIG.AURAMANCY.conditions;
      data_name = "data.traits.conditional_immunities";
    } else if (name === "Sensitivities") {
      current_values = this.object.data.data.traits.sensitivities;
      available_options = CONFIG.AURAMANCY.sensitivities;
      data_name = "data.traits.sensitivities";
    } else if (name === "Movement Enhancements") {
      current_values = this.object.data.data.traveling.movement_enhancements;
      available_options = CONFIG.AURAMANCY.movementEnhancements;
      data_name = "data.traveling.movement_enhancements";
    } else if (name === "Cultivations") {
      current_values = this.object.data.data.progression.cultivations_array;
      available_options = CONFIG.AURAMANCY.cultivation;
      data_name = "data.progression.cultivations_array";
    } else if (name === "Releases") {
      current_values = this.object.data.data.progression.releases_array;
      available_options = CONFIG.AURAMANCY.releases;
      data_name = "data.progression.releases_array";
    } else if (name === "Paths") {
      current_values = this.object.data.data.progression.paths_array;
      available_options = CONFIG.AURAMANCY.paths;
      data_name = "data.progression.paths_array";
    } else if (name === "Level1") {
      current_values = this.object.data.data.progression.level1_array;
      available_options = CONFIG.AURAMANCY.level1Options;
      data_name = "data.progression.level1_array";
    } else {
      console.log("Oopssieeeesss");
      return;
    }

    const options = { current_values, available_options, name, data_name };
    return new ActorBoxSelectorConfig(this.object, options).render(true);
  }

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
   * @param {Event} event      The click event which originated the selection.
   * @returns {TraitSelector}  Newly displayed application.
   * @private
   */
  _onProfBoxSelector(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    let proficiency_options = {};
    let expertise_options = {};
    let current_proficiency_values = [];
    let current_expertise_values = [];
    let proficiency_data_name = "";
    let expertise_data_name = "";

    if (name === "Equipment") {
      current_proficiency_values = this.object.data.data.proficiencies.equipment.proficiency;
      current_expertise_values = this.object.data.data.proficiencies.equipment.expertise;
      proficiency_options = CONFIG.AURAMANCY.proficiencyEquipment;
      expertise_options = CONFIG.AURAMANCY.weaponExpertise;
      proficiency_data_name = "data.proficiencies.equipment.proficiency";
      expertise_data_name = "data.proficiencies.equipment.expertise";
    } else if (name === "Augmentation") {
      current_proficiency_values = this.object.data.data.proficiencies.augmentation.proficiency;
      current_expertise_values = this.object.data.data.proficiencies.augmentation.expertise;
      proficiency_options = CONFIG.AURAMANCY.proficiencyAugmentation;
      expertise_options = CONFIG.AURAMANCY.augmentationExpertise;
      proficiency_data_name = "data.proficiencies.augmentation.proficiency";
      expertise_data_name = "data.proficiencies.augmentation.expertise";
    } else if (name === "Spellcasting") {
      current_proficiency_values = this.object.data.data.proficiencies.spellcasting.proficiency;
      current_expertise_values = this.object.data.data.proficiencies.spellcasting.expertise;
      proficiency_options = CONFIG.AURAMANCY.proficiencySpellcasting;
      expertise_options = CONFIG.AURAMANCY.spellcastingExpertise;
      proficiency_data_name = "data.proficiencies.spellcasting.proficiency";
      expertise_data_name = "data.proficiencies.spellcasting.expertise";
    } else {
      console.log("Oopssieeeesss");
      return;
    }

    const options = { current_proficiency_values, current_expertise_values, proficiency_options, expertise_options, proficiency_data_name, expertise_data_name };
    return new ActorProfBoxSelectorConfig(this.object, options).render(true);
  }

  _onCharacteristicsSelector(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    let available_options = {};
    let current_values = [];
    let data_name = "";

    if (name === "Backgrounds") {
      current_values = this.object.data.data.social.characteristics.backgrounds;
      available_options = CONFIG.AURAMANCY.characteristicsBackgrounds;
      data_name = "data.social.characteristics.backgrounds";
    } else if (name === "Cultures") {
      current_values = this.object.data.data.social.characteristics.cultures;
      available_options = CONFIG.AURAMANCY.characteristicsCultures;
      data_name = "data.social.characteristics.cultures";
    } else if (name === "Traits") {
      current_values = this.object.data.data.social.characteristics.traits;
      available_options = CONFIG.AURAMANCY.characteristicsTraits;
      data_name = "data.social.characteristics.traits";
    } else if (name === "Strings") {
      current_values = this.object.data.data.social.strings;
      available_options = {};
      data_name = "data.social.strings";
    } else {
      console.log("Oopssieeeesss");
      return;
    }

    const options = { current_values, available_options, name, data_name };
    return new ActorCharacteristicsConfig(this.object, options).render(true);
  }

  _onProficienciesSelector(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    let available_options = "";
    let data_name = "";
    let expertise_separate = false;
    let extra_proficiencies = false;

    if (name === "Weapons") {
      available_options = "proficiencyWeapons";
      data_name = "data.proficiencies.weapons";
      expertise_separate = true;
      extra_proficiencies = true;
    } else if (name === "Tools") {
      available_options = "proficiencyTools";
      data_name = "data.proficiencies.tools";
    } else if (name === "Instruments") {
      available_options = "proficiencyInstruments";
      data_name = "data.proficiencies.instruments";
      expertise_separate = true;
    } else if (name === "Languages") {
      available_options = "proficiencyLanguages";
      data_name = "data.proficiencies.languages";
    } else if (name === "Vehicles") {
      available_options = "proficiencyVehicles";
      data_name = "data.proficiencies.vehicles";
      expertise_separate = true;
    } else if (name === "Operating") {
      available_options = "proficiencyVehicles";
      data_name = "data.proficiencies.operating";
    } else if (name === "Crafting") {
      available_options = "proficiencyCrafting";
      data_name = "data.proficiencies.crafting";
    } else if (name === "Other") {
      available_options = "proficiencyOther";
      data_name = "data.proficiencies.other";
    } else {
      console.log("Oopssieeeesss");
      return;
    }

    const options = { available_options, name, data_name, expertise_separate, extra_proficiencies };
    return new ActorProficienciesConfig(this.object, options).render(true);
  }

  /**
   * Prepare sensories object for display.
   * @param {object} actorData  Copy of actor data being prepared for display.
   * @returns {object}          sensories grouped by key with localized and formatted string.
   * @protected
   */
  _getProficiencies(actorData) {
    const weapons = actorData.data.proficiencies.weapons || {};
    const tools = actorData.data.proficiencies.tools || {};
    const instruments = actorData.data.proficiencies.instruments || {};
    const languages = actorData.data.proficiencies.languages || {};
    const vehicles = actorData.data.proficiencies.vehicles || {};
    const crafting = actorData.data.proficiencies.crafting || {};
    const operating = actorData.data.proficiencies.operating || {};
    const other = actorData.data.proficiencies.other || {};
    const equipment_proficiency = actorData.data.proficiencies.equipment.proficiency || {};
    const equipment_expertise = actorData.data.proficiencies.equipment.expertise || {};
    const augmentation_proficiency = actorData.data.proficiencies.augmentation.proficiency || {};
    const augmentation_expertise = actorData.data.proficiencies.augmentation.expertise || {};
    const spellcasting_proficiency = actorData.data.proficiencies.spellcasting.proficiency || {};
    const spellcasting_expertise = actorData.data.proficiencies.spellcasting.expertise || {};
    const proficiencies = {};

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- WEAPONS ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let weapons_list = {};
    for(let [key, value] of Object.entries(weapons)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        weapons_list[key] = asterisk;
      }
    }
    for(const element of weapons["expertise"]){
      weapons_list[element] = "*";
    }
    const ordered_weapons = Object.keys(weapons_list).sort().reduce(
      (obj, key) => {
        obj[key] = weapons_list[key];
        return obj;
      },
      {}
    );
    proficiencies["weapons"] = ordered_weapons;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- TOOLS ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let tools_list = {};
    for(let [key, value] of Object.entries(tools)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        tools_list[key] = asterisk;
      }
    }
    const ordered_tools = Object.keys(tools_list).sort().reduce(
      (obj, key) => {
        obj[key] = tools_list[key];
        return obj;
      },
      {}
    );
    proficiencies["tools"] = ordered_tools;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- INSTRUMENTS ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let instruments_list = {};
    for(let [key, value] of Object.entries(instruments)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        instruments_list[key] = asterisk;
      }
    }
    for(const element of instruments["expertise"]){
      instruments_list[element] = "*";
    }
    const ordered_instruments = Object.keys(instruments_list).sort().reduce(
      (obj, key) => {
        obj[key] = instruments_list[key];
        return obj;
      },
      {}
    );
    proficiencies["instruments"] = ordered_instruments;


    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- LANGUAGES ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let languages_list = {};
    for(let [key, value] of Object.entries(languages)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        languages_list[key] = asterisk;
      }
    }
    const ordered_languages = Object.keys(languages_list).sort().reduce(
      (obj, key) => {
        obj[key] = languages_list[key];
        return obj;
      },
      {}
    );
    proficiencies["languages"] = ordered_languages;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- VEHICLES ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let vehicles_list = {};
    for(let [key, value] of Object.entries(vehicles)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        vehicles_list[key] = asterisk;
      }
    }
    for(const element of vehicles["expertise"]){
      vehicles_list[element] = "*";
    }
    const ordered_vehicles = Object.keys(vehicles_list).sort().reduce(
      (obj, key) => {
        obj[key] = vehicles_list[key];
        return obj;
      },
      {}
    );
    proficiencies["vehicles"] = ordered_vehicles;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- Crafting ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let crafting_list = {};
    for(let [key, value] of Object.entries(crafting)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        crafting_list[key] = asterisk;
      }
    }
    const ordered_crafting = Object.keys(crafting_list).sort().reduce(
      (obj, key) => {
        obj[key] = crafting_list[key];
        return obj;
      },
      {}
    );
    proficiencies["crafting"] = ordered_crafting;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- OPERATING ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let operating_list = {};
    for(let [key, value] of Object.entries(operating)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        operating_list[key] = asterisk;
      }
    }
    const ordered_operating = Object.keys(operating_list).sort().reduce(
      (obj, key) => {
        obj[key] = operating_list[key];
        return obj;
      },
      {}
    );
    proficiencies["operating"] = ordered_operating;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- OTHER ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let other_list = {};
    for(let [key, value] of Object.entries(other)){
      if(key !== "expertise" && value !== 0){
        let asterisk = "";
        if(value === 2){
          asterisk = "*";
        }
        other_list[key] = asterisk;
      }
    }
    const ordered_other = Object.keys(other_list).sort().reduce(
      (obj, key) => {
        obj[key] = other_list[key];
        return obj;
      },
      {}
    );
    proficiencies["other"] = ordered_other;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- EQUIPMENT ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let equipment_list = {};
    for(let [key, value] of Object.entries(equipment_proficiency)){
      equipment_list[value] = "";
    }
    for(let [key, value] of Object.entries(equipment_expertise)){
      equipment_list[value] = "*";
    }
    const ordered_equipment = Object.keys(equipment_list).sort().reduce(
      (obj, key) => {
        obj[key] = equipment_list[key];
        return obj;
      },
      {}
    );
    proficiencies["equipment"] = equipment_list;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- AUGMENTATION ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let augmentation_list = {};
    for(let [key, value] of Object.entries(augmentation_proficiency)){
      augmentation_list[value] = "";
    }
    for(let [key, value] of Object.entries(augmentation_expertise)){
      augmentation_list[value] = "*";
    }
    const ordered_augmentation = Object.keys(augmentation_list).sort().reduce(
      (obj, key) => {
        obj[key] = augmentation_list[key];
        return obj;
      },
      {}
    );
    proficiencies["augmentation"] = augmentation_list;

    // -----------------------------------------------------------------------------------------
    // ---------------------------------------- SPELLCASTING ----------------------------------------
    // -----------------------------------------------------------------------------------------
    let spellcasting_list = {};
    for(let [key, value] of Object.entries(spellcasting_proficiency)){
      spellcasting_list[value] = "";
    }
    for(let [key, value] of Object.entries(spellcasting_expertise)){
      spellcasting_list[value] = "*";
    }
    const ordered_spellcasting = Object.keys(spellcasting_list).sort().reduce(
      (obj, key) => {
        obj[key] = spellcasting_list[key];
        return obj;
      },
      {}
    );
    proficiencies["spellcasting"] = spellcasting_list;

    return proficiencies;
  }

  /**
  * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options.
  * @param {Event} event   The click event which originated the selection.
  * @private
  */
  _onConfigMenu(event) {
    event.preventDefault();
    const button = event.currentTarget;
    let app;
    switch ( button.dataset.action ) {
      case "sensories":
        app = new ActorSensoriesConfig(this.object);
        break;
      case "movement":
        app = new ActorMovementConfig(this.object);
        break;
    }
    app?.render(true);
  }

  async getDefaultAbilities() {
    let default_abilities = [];

    let compendium = game.packs.get("auramancy.default_abilities");
    console.log(compendium);

    return ;
  }

  static async loadClassFeatures() {
    // Get the configuration of features which may be added
    const clsConfig = "auramancy.default_abilities";
    if (!clsConfig) return [];

    let ids = [];

    // Acquire class features
    // let ids = [];
    // for ( let [l, f] of Object.entries(clsConfig.features || {}) ) {
    //   l = parseInt(l);
    //   if ( (l <= level) && (l > priorLevel) ) ids = ids.concat(f);
    // }

    // Acquire subclass features
    // const subConfig = clsConfig.subclasses[subclassName] || {};
    // for ( let [l, f] of Object.entries(subConfig.features || {}) ) {
    //   l = parseInt(l);
    //   if ( (l <= level) && (l > priorLevel) ) ids = ids.concat(f);
    // }

    // Load item data for all identified features
    const features = [];
    for ( let id of ids ) {
      features.push(await fromUuid(id));
    }

    // Class spells should always be prepared
    for ( const feature of features ) {
      if ( feature.type === "spell" ) {
        const preparation = feature.data.data.preparation;
        preparation.mode = "always";
        preparation.prepared = true;
      }
    }
    return features;
  }

}
