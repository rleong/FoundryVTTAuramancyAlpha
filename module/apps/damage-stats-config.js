export default class ActorDamageStatsConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/damage-stats-config.html",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Damage ${this.options.name}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    const damage_types = this.options.damage_types;
    const damage_subtypes = this.options.damage_subtypes;
    const name = this.options.name;

    const data = {
      damage_types,
      damage_subtypes,
      name
    };
    console.log(data)
    return data;
  }
}
