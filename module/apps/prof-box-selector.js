export default class ActorProfBoxSelectorConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/prof-box-selector.html",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    const proficiency_options = Object.entries(this.options.proficiency_options);
    const expertise_options = Object.entries(this.options.expertise_options);

    const current_proficiency_values = Object.entries(this.options.current_proficiency_values);
    const current_expertise_values = Object.entries(this.options.current_expertise_values);

    let proficiency_array = {};
    for(const element of proficiency_options){
      let string = `${element}`.split(",");

      for(const sub_element of current_proficiency_values){
        let sub_string = `${sub_element}`.split(",");
        if (sub_string[1] === string[1]){
          proficiency_array[string[1]] = "checked";
        }
      }
      if(proficiency_array[string[1]] !== "checked"){
        proficiency_array[string[1]] = "";
      }
    }

    let expertise_array = {};
    for(const element of expertise_options){
      let string = `${element}`.split(",");

      for(const sub_element of current_expertise_values){
        let sub_string = `${sub_element}`.split(",");
        if (sub_string[1] === string[1]){
          expertise_array[string[1]] = "checked";
        }
      }
      if(expertise_array[string[1]] !== "checked"){
        expertise_array[string[1]] = "";
      }
    }

    const data = {
      proficiency_array,
      expertise_array
    };

    return data;
  }

  /** @override */
  async _updateObject(event, formData) {
    const option = this.options;
    const proficiency_options = this.options.proficiency_options;
    const expertise_options = this.options.expertise_options;

    const prof_set = new Set();
    const exp_set = new Set();

    for ( let [k, v] of Object.entries(proficiency_options) ) {
      prof_set.add(v);
    }

    for ( let [k, v] of Object.entries(expertise_options) ) {
      exp_set.add(v);
    }

    console.log(prof_set);
    console.log(exp_set);

    let prof_array_list = [];
    let exp_array_list = [];
    for ( let [k, v] of Object.entries(formData) ) {
      // console.log(k);
      if (v === true ) {
        if (prof_set.has(k)){
          console.log("Prof");
          prof_array_list.push(k);
        } else if (exp_set.has(k)){
          console.log("Exp");
          exp_array_list.push(k);
        }
        console.log(k);
      }
    }
    prof_array_list.sort();
    exp_array_list.sort();

    const prof_update_data = {};
    prof_update_data[`${this.options.proficiency_data_name}`] = prof_array_list;
    this.object.update(prof_update_data);

    const exp_update_data = {};
    exp_update_data[`${this.options.expertise_data_name}`] = exp_array_list;
    this.object.update(exp_update_data);
  }
}
