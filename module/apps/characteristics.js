export default class ActorCharacteristicsConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/characteristics.html",
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
    let splice_index = [];
    for(const element of available_options){
      let string = `${element}`.split(",");

      for(const sub_element of current_values){
        let sub_string = `${sub_element}`.split(",");
        if (sub_string[1] === string[1]){
          organized_array[string[1]] = "checked";
          splice_index.push(current_values.indexOf(sub_element));
        }
      }
      if(organized_array[string[1]] !== "checked"){
        organized_array[string[1]] = "";
      }

    }

    for(let i = 0; i < splice_index.length; i++){
      current_values.splice(i, 1);
    }

    // console.log(`Remaining: ${current_values}`)

    for(const element of current_values){
      let sub_string = `${element}`.split(",");
      if(sub_string[1] !== ""){
        organized_array[sub_string[1]] = "checked";
      }
    }

    const ordered = Object.keys(organized_array).sort().reduce(
      (obj, key) => {
        obj[key] = organized_array[key];
        return obj;
      },
      {}
    );

    const data = {
      ordered,
      name
    };

    return data;
  }

  /** @override */
  async _updateObject(event, formData) {
    const option = this.options;

    let array_list = [];
    for(let [k, v] of Object.entries(formData)){
      if(k !== "customCharacteristics" && v === true){
        array_list.push(k);
      } else if (k === "customCharacteristics" && v.trim() !== ""){
        let sub_strings = v.split(",");
        for(const sub_element of sub_strings){
          if(sub_element !== ""){
            array_list.push(sub_element.trim());
          }
        }
      }
    }
    array_list.sort();

    const update_data = {};
    update_data[`${this.options.data_name}`] = array_list;
    this.object.update(update_data);
  }
}
