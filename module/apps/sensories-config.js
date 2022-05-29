export default class ActorSensoriesConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/sensories-config.html",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Sensories: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const sensories = foundry.utils.getProperty(this.document.data._source, "data.traits.sensories") || {};
    const data = {
      sensories: {},
      special: sensories.special ?? "",
      units: sensories.units,
      movementUnits: CONFIG.AURAMANCY.movementUnits
    };
    for ( let [name, label] of Object.entries(CONFIG.AURAMANCY.sensories) ) {
      const v = sensories[name];
      data.sensories[name] = {
        label: label,
        value: Number.isNumeric(v) ? v.toNearest(0.1) : 0
      };
    }
    console.log(data)
    return data;
  }
}
