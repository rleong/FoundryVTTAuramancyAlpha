import ItemObjectTagConfig from "../apps/object-tag-config.js";
import ItemMovementConfig from "../apps/object-movement-config.js";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class AuramancyItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["auramancy", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/auramancy/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    return `${path}/item-${this.item.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item.data;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = itemData.data;
    context.flags = itemData.flags;
    context.config = CONFIG.AURAMANCY;

    // tags
    context.tags = this._getTags(itemData);

    // tags
    context.movement = this._getMovement(itemData);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    // Damage Selector
    html.find(".object-tag-config").click(this._onObjectTagConfig.bind(this));

    // Damage Selector
    html.find(".object-movement-config").click(this._onMovementConfig.bind(this));
  }

  _onMovementConfig(event) {
    event.preventDefault();

    return new ItemMovementConfig(this.object).render(true);
  }

  _getMovement(itemData) {
    const movement = itemData.data.stats.movement.options || {};
    const tags = {};
    for ( let [k, label] of Object.entries(CONFIG.AURAMANCY.movementOptions) ) {
      const v = movement[k] ?? 0;
      if ( v === 0 ) continue;
      tags[k] = `${label}: ${v} ${movement.units}`;
    }
    if ( movement.special ) tags.special = movement.special;
    return tags;
  }

  _onObjectTagConfig(event) {
    event.preventDefault();

    return new ItemObjectTagConfig(this.object).render(true);
  }

  _getTags(itemData) {
    const robustness = itemData.data.tags.robustness || {};
    const substance = itemData.data.tags.substance || {};
    const special = itemData.data.tags.special || {};
    const traits = itemData.data.tags.traits || {};
    const misc = itemData.data.tags.misc || {};
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

}
