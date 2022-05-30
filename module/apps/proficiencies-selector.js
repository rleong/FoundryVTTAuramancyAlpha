export default class ActorProficienciesConfig extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/apps/proficiencies-selector.html",
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
    const proficiency_level = CONFIG.AURAMANCY.proficiencyLevel;
    const proficiency_names = CONFIG.AURAMANCY[`${this.options.available_options}`];
    const name = this.options.name;
    const expertise = this.options.expertise_separate;
    const extra_proficiencies = this.options.extra_proficiencies;
    const proficiencies = foundry.utils.getProperty(this.document.data._source, `${this.options.data_name}`) || {};

    let available_options_array = {};
    let current_values = [];
    let proficiency_array = {};
    let extra_proficiencies_array = {};
    if(expertise === true){
      if(extra_proficiencies === true){
        for(let [key, value] of Object.entries(proficiency_names)){
          // console.log(`${key}: ${value}`);
          available_options_array[key] = proficiencies[key];
        }
        current_values = proficiencies["expertise"];
        for(let [key, value] of Object.entries(proficiencies)){
          if(key !== "expertise" && !proficiency_names[key]){
            // console.log(`Key: ${key}`);
            extra_proficiencies_array[key] = value;
          }
        }
      } else {
        for(let [key, value] of Object.entries(proficiencies)){
          // console.log(`${key}: ${value}`);
          if(key === "expertise"){
            current_values = value;
          } else {
            available_options_array[key] = value;
          }
        }
      }
      current_values.sort();
      for(let [key, value] of Object.entries(proficiency_level)){
        // console.log(`${key}: ${value}`);
        if(key === "0" || key === "1"){
          proficiency_array[key] = value;
        }
      }
    } else {
      available_options_array = proficiencies;
      proficiency_array = proficiency_level;
    }

    const data = {
      name,
      proficiency_array,
      available_options_array,
      expertise,
      current_values,
      proficiency_names,
      extra_proficiencies,
      extra_proficiencies_array,
      proficiency_level
    };

    // console.log(data);
    return data;
  }

  /** @override */
  async _updateObject(event, formData) {

    let regular_proficiencies = {};
    let expertise_list = [];

    for(let[key,value] of Object.entries(formData)){
      if(key !== "expertiseOptions" && !key.includes("expertise_") && key !== "specOptions"){
        regular_proficiencies[key] = parseInt(`${value}`.trim());
      } else if(key === "expertiseOptions" && value.trim() !== ""){
        if(value.trim().includes(",")){
          let element = value.trim().split(",");
          for(const sub_element of element){
            if(sub_element.trim() !== ""){
              expertise_list.push(sub_element);
            }
          }
        } else {
          expertise_list.push(value.trim());
        }
      } else if(key.includes("expertise_")){
        if(value === true){
          expertise_list.push(key.replace("expertise_", ""));
        }
      } else if(key === "specOptions" && value.trim() !== ""){
        // console.log(`Value: |${key}||${value}|`);
        if(value.includes(",")){
          for(let element of value.trim().split(",")){
            if(element.trim() !== ""){
              element = element.trim();
              let capitalized = element.charAt(0).toUpperCase() + element.slice(1);
              regular_proficiencies[capitalized] = 1;
            }
          }
        } else {
          value = value.trim();
          let capitalized = value.charAt(0).toUpperCase() + value.slice(1);
          regular_proficiencies[capitalized] = 1;
        }
      }
    }
    if(this.options.expertise_separate === true){
      expertise_list.sort();
      for(const element of expertise_list){
        if(element.charAt(0).match(/[a-z]/i)){
          let capitalized = element.charAt(0).toUpperCase() + element.slice(1);
          // console.log(capitalized);
          expertise_list[expertise_list.indexOf(element)] = capitalized;
        }
      }
      regular_proficiencies["expertise"] = expertise_list;
    }

    const update_data = {};
    update_data[`${this.options.data_name}`] = regular_proficiencies;
    // console.log(update_data);
    this.object.update(update_data);
  }
}
