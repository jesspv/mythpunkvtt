export class StargazerActor extends Actor {

/** @override */
static async createActor(data, options={}) {
    token = token || {};
    let defaults = {};
    if (data.type === "character") {
      defaults = {
        actorLink: true,
        disposition: 1,
        vision: true,
        dimSight: 0,
        brightSight: 0,
      };
    }
    mergeObject(token, defaults, {overwrite: false});
    return super.createActor(data, options);
    }  

    _prepareCharacterData(actorData) {
        const data = actorData.data;
        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags;
    
        if (actorData.type === "character") this._prepareCharacterData(actorData);
    
        if (actorData.type === "npc") this._prepareNpcData(actorData);
      }

    _prepareNpcData(actorData) {
            const data = actorData.data;
            const actorData = this.data;
            const data = actorData.data;
            const flags = actorData.flags;
        
            if (actorData.type === "character") this._prepareCharacterData(actorData);
        
            if (actorData.type === "npc") this._prepareNpcData(actorData);
          }

getRollData() {
    const data = super.getRollData();
    const actorData = this.data;
    this._getCharacterRollData(data);
    this._getNpcRollData(data);
    return data;
    }

    _getCharacterRollData(data) {
        if (this.data.type !== 'character') return;
        if (data.skills) {
            for (let [k, v] of Object.entries(data.skills)) {
              data[k] = foundry.utils.deepClone(v);
            }
          }
        if (data.attributes.level) {
            data.lvl = data.attributes.level.value ?? 0;
          }
        }
        _getNpcRollData(data) {
            if (this.data.type !== 'npc') return;
            if (data.skills) {
                for (let [k, v] of Object.entries(data.skills)) {
                  data[k] = foundry.utils.deepClone(v);
                }
              }
            if (data.attributes.level) {
                data.lvl = data.attributes.level.value ?? 0;
              }
            }
}

