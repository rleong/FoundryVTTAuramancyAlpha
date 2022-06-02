export default class ItemObjectTagConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/object-tag-config.html",
      width: 300,
      height: 600
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Object Tags: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const robustness = foundry.utils.getProperty(this.document.data._source, "data.tags.robustness") || {};
    const substance = foundry.utils.getProperty(this.document.data._source, "data.tags.substance") || {};
    const special = foundry.utils.getProperty(this.document.data._source, "data.tags.special") || {};
    const traits = foundry.utils.getProperty(this.document.data._source, "data.tags.traits") || {};
    const misc = foundry.utils.getProperty(this.document.data._source, "data.tags.misc") || {};
    const object_tags = CONFIG.AURAMANCY.objectTags;

    const data = {
      robustness,
      substance,
      special,
      traits,
      misc,
      object_tags
    };

    return data;
  }
}
