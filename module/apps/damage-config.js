export default class ItemDamageConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/damage-config.html",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Damage: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    const damage_types = this.options.damage_types;
    const damage_subtypes = this.options.damage_subtypes;
    const name = this.options.name;
    const current_values = this.options.current_values;

    const data = {
      damage_types,
      damage_subtypes,
      name,
      current_values
    };

    return data;
  }

  /** @override */
  async _updateObject(event, formData) {
    const o = this.options;

    const chosen = [];
    let string = "";
    let current_values = [];
    let add_on = true;
    for ( let [k, v] of Object.entries(formData) ) {
      if (k === "choiceType") {
        string += o.damage_types[v];
        if (v === "none") {
          add_on = false;
        }
      } else if (k === "choiceSubtype") {
        if (v !== "all") {
          string += " (" + o.damage_subtypes[v] + ") ";
        } else {
          string += " "
        }
      } else if (k === "choiceAmount") {
        if (v !== "null" && v !== null) {
          string = v + " " + string;
        }
      } else {
        if (v === true) {
          current_values.push(k);
        } else {
          console.log(k);
          console.log(v);
        }
      }
    }
    if (add_on === true) {
      current_values.push(string);
    }

    let filtered_array = [...new Set(current_values.sort())];

    const update_data = {};
    update_data[`${this.options.property_name}`] = filtered_array;

    this.object.update(update_data);
  }
}
