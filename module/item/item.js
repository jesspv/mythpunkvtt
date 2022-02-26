export class StargazerItem extends Item {

    prepareData() {
        super.prepareData();
        const itemData = this.data;
        const actorData = this.actor ? this.actor.data : {};
        const data = itemData.data;
    }

roll() {
    const token = this.actor.token;
    const item = this.data;
    const actorData = this.actor ? this.actor.data.data : {};
    const itemData = item.data;
    let roll = new Roll('d20+@abilities.str.mod', actorData);
    let label = `Rolling ${item.name}`;
    roll.roll().toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: label 
    });
    }
}