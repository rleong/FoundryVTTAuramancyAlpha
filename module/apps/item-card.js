export default class ItemCard extends DocumentSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["auramancy"],
      template: "systems/auramancy/templates/chat/item-card.html",
      width: 350,
      height: 450
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `Information: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const actor = this.options.actor.data;
    const item = this.options.item.data;

    const data = {
      actor,
      item
    };

    return data;
  }
}
