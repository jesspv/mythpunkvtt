class MythpunkItemSheet extends ItemSheet  {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["mythpunk", "sheet", "item"],
          width: 520,
          height: 480,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
      }
      get template() {
        const path = "systems/mythpunk/templates/item";
        return `${path}/item-${this.item.data.type}-sheet.html`;
  }


getData() {
    const data = super.getData();
    return data;

  setPosition(options = {}) ;
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  

  activateListeners(html) ;
    super.activateListeners(html);

    if (!this.options.editable) return;
}
}