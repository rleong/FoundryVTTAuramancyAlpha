import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";
import ActorSensoriesConfig from "../apps/sensories-config.js";
import ActorDamageStatsConfig from "../apps/damage-stats-config.js";
import ActorMovementConfig from "../apps/movement-config.js";
import ActorBoxSelectorConfig from "../apps/box-selector.js";
import ActorCharacteristicsConfig from "../apps/characteristics.js";


/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class AuramancyActorSheet extends ActorSheet {

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
    const gear = [];
    const features = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: []
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.data.spellLevel != undefined) {
          spells[i.data.spellLevel].push(i);
        }
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
    context.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Configure Special Flags
    html.find(".config-button").click(this._onConfigMenu.bind(this));

    // Trait Selector
    html.find(".trait-selector").click(this._onTraitSelector.bind(this));

    // Damage Selector
    html.find(".damage-selector").click(this._onDamageSelector.bind(this));

    // Damage Selector
    html.find(".box-selector").click(this._onBoxSelector.bind(this));

    // Damage Selector
    html.find(".characteristics-selector").click(this._onCharacteristicsSelector.bind(this));

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

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

  /**
   * Prepare the data structure for traits data like languages, resistances & vulnerabilities, and proficiencies.
   * @param {object} traits   The raw traits data object from the actor data. *Will be mutated.*
   * @private
   */
  _prepareTraits(traits) {
    const map = {
      dr: CONFIG.AURAMANCY.damageResistanceTypes,
      di: CONFIG.AURAMANCY.damageResistanceTypes,
      dv: CONFIG.AURAMANCY.damageResistanceTypes,
      ci: CONFIG.AURAMANCY.conditionTypes,
      languages: CONFIG.AURAMANCY.languages
    };
    for ( let [t, choices] of Object.entries(map) ) {
      const trait = traits[t];
      if ( !trait ) continue;
      let values = [];
      if ( trait.value ) {
        values = trait.value instanceof Array ? trait.value : [trait.value];
      }
      trait.selected = values.reduce((obj, t) => {
        obj[t] = choices[t];
        return obj;
      }, {});

      // Add custom entry
      if ( trait.custom ) {
        trait.custom.split(";").forEach((c, i) => trait.selected[`custom${i+1}`] = c.trim());
      }
      trait.cssClass = !isObjectEmpty(trait.selected) ? "" : "inactive";
    }

    // Populate and localize proficiencies
    // for ( const t of ["armor", "weapon", "tool"] ) {
    //   const trait = traits[`${t}Prof`];
    //   if ( !trait ) continue;
    //   Actor5e.prepareProficiencies(trait, t);
    //   trait.cssClass = !isObjectEmpty(trait.selected) ? "" : "inactive";
    // }
  }

  _getDamageStats(actorData) {

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
    console.log(options)
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
    } else if (name === "Sensitivities") {
      current_values = this.object.data.data.traits.sensitivities;
      available_options = CONFIG.AURAMANCY.sensitivities;
      data_name = "data.traits.sensitivities";
    } else {
      console.log("Oopssieeeesss");
      return;
    }

    console.log(current_values);
    console.log(available_options);

    const options = { current_values, available_options, name, data_name };
    console.log(options)
    return new ActorBoxSelectorConfig(this.object, options).render(true);
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
    } else {
      console.log("Oopssieeeesss");
      return;
    }

    console.log(current_values);
    console.log(available_options);

    const options = { current_values, available_options, name, data_name };
    console.log(options)
    return new ActorCharacteristicsConfig(this.object, options).render(true);
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
        console.log("movement!");
        app = new ActorMovementConfig(this.object);
        break;
    }
    app?.render(true);
  }

}
