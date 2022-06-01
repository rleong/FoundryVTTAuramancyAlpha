export default class ActorMovementConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/object-movement-config.html",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Movement Options: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const movement = foundry.utils.getProperty(this.document.data._source, "data.stats.movement.options") || {};
    const data = {
      movement: {},
      special: movement.special ?? "",
      units: movement.units, movementUnits: CONFIG.AURAMANCY.movementUnits
    };
    for ( let [name, label] of Object.entries(CONFIG.AURAMANCY.movementOptions) ) {
      const v = movement[name];
      data.movement[name] = {
        label: label,
        value: Number.isNumeric(v) ? v.toNearest(0.1) : 0
      };
    }
    console.log(data.movement)
    return data;
  }
}
