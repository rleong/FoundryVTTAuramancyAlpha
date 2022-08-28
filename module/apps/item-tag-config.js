export default class ItemItemTagConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/item-tag-config.html",
      width: 300,
      height: 600
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Item Tags: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const item = foundry.utils.getProperty(this.document.data._source, "data.tags.item") || {};
    const equipment = foundry.utils.getProperty(this.document.data._source, "data.tags.equipment") || {};
    const armor = foundry.utils.getProperty(this.document.data._source, "data.tags.armor") || {};
    const weapon = foundry.utils.getProperty(this.document.data._source, "data.tags.weapon") || {};
    const shield = foundry.utils.getProperty(this.document.data._source, "data.tags.shield") || {};
    const all_tags = CONFIG.AURAMANCY.allItemTags;

    const data = {
      item,
      equipment,
      armor,
      weapon,
      shield,
      all_tags
    };

    return data;
  }
}
