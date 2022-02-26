export class StargazerActorSheet extends ActorSheet {


static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
        classes: ["mythpunk", "sheet", "actor"],
        template: "systems/mythpunk/templates/actor/actor-sheet.html",
        width: 700,
        height: 800,
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }],
    });
}

get template() {
    return `systems/mythpunk/templates/actor/actor-${this.actor.data.type}-sheet.html`;
  }

  getData() {
    const context = super.getData();
    const actorData = context.actor.data;
    context.data = actorData.data;
    context.flags = actorData.flags;
    context.dtypes = ["String", "Number", "Boolean"];
    if (actorData.type == 'character') {
        this._prepareItems(context);
        }
    if (actorData.type == 'npc') {
        this._prepareItems(context);
        }
    context.rollData = context.actor.getRollData();
    return context;
    }

    _prepareItems(context) {
        const actorData = context.actor.data;
        const data = actorData.data;
        const items = [];
        const itemTypes = ["gear", "features", "weapons", "augments"];
        itemTypes.forEach(type => {
            if (data[type]) {
                items.push({
                    type: type,
                    items: data[type]
                });
            }
        }
        );
        context.items = items;
    }

    _prepareCharacterData(context) {   
        for (let [k, v] of Object.entries(context.data.skills)) {
            v.label = game.i18n.localize(CONFIG.MYTHPUNK.skills[k]) ?? k;
          }
        }

        activateListeners(html) {
            super.activateListeners(html);

            if (!this.options.editable) return;

            html.find('.item-create').click(this._onItemCreate.bind(this));
            const li = html.find('.item-create');
            li.contextmenu(this._onItemCreate.bind(this));
            
            html.find('.item-edit').click(this._onItemEdit.bind(this));
            const li = html.find('.item-edit');
            li.contextmenu(this._onItemEdit.bind(this));

            html.find('.item-delete').click(this._onItemDelete.bind(this));
            const li = html.find('.item-delete');
            li.contextmenu(this._onItemDelete.bind(this));
        }

        _onItemCreate(event) {
            event.preventDefault();
            const header = event.currentTarget;
            const type = header.dataset.type;
            const data = duplicate(header.dataset);
            const name = `New ${type.capitalize()}`;
            const itemData = {
                name: name,
                type: type,
                data: data
              };
              delete itemData.data["type"];
              return await Item.create(itemData, {parent: this.actor});
  }

        _onItemEdit(event) {
            event.preventDefault();
            const li = $(event.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        }

        _onItemDelete(event) {
            event.preventDefault();
            const li = $(event.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            this.actor.deleteOwnedItem(item.id);
        }
}

        html.find('.rollable').click(this._onRoll.bind(this));
        if (this.actor.isowner) {
            let handler = ev => this._onDragStart(ev);
            html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
            li.setAttribute("draggable", true);
            li.addEventListener("dragstart", handler, false);
            })
        }

        _onRoll (clickEvent);
        if (dataset.rollType) {
            if (dataset.rollType == 'item') {
              const itemId = element.closest('.item').dataset.itemId;
              const item = this.actor.items.get(itemId);
              if (item) return item.roll();
            }
          }
      
          if (dataset.roll) {
            const label = dataset.label ? `Rolled ${dataset.label}` : '';
            const roll = new Roll(dataset.roll, this.actor.getRollData()).evaluate();
            await roll.evaluate().toMessage({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              flavor: label,
              rollMode: game.settings.get('core', 'rollMode'),
            });
            return roll;
            }
