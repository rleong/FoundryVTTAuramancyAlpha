export default class ActorConditionsConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/conditions-config.html",
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
    const conditions = foundry.utils.getProperty(this.document.data._source, "data.health.conditions") || {};
    const condition_tags = CONFIG.AURAMANCY.conditions;

    const data = {
      conditions,
      condition_tags
    };

    return data;
  }
}
