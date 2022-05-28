export default class ActorBoxSelectorConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/box-selector.html",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `${this.options.name}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    const available_options = Object.entries(this.options.available_options);
    const current_values = Object.entries(this.options.current_values);
    const name = this.options.name;

    let organized_array = {};
    for(const element of available_options){
      let string = `${element}`.split(",");

      for(const sub_element of current_values){
        let sub_string = `${sub_element}`.split(",");
        if (sub_string[1] === string[1]){
          organized_array[string[1]] = "checked";
        }
      }
      if(organized_array[string[1]] !== "checked"){
        organized_array[string[1]] = "";
      }

    }

    const data = {
      organized_array,
      name
    };

    return data;
  }

  /** @override */
  async _updateObject(event, formData) {
    const option = this.options;

    let array_list = [];
    for ( let [k, v] of Object.entries(formData) ) {
      if (v === true) {
        array_list.push(k);
      }
    }
    array_list.sort();

    const update_data = {};
    update_data[`${this.options.data_name}`] = array_list;
    this.object.update(update_data);
  }
}
