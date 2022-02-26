import { MythpunkActor } from "./actor/actor.js";
import { MythpunkActorSheet } from "./actor/actor-sheet.js";
import { MythpunkItem } from "./item/item.js";
import { MythpunkItemSheet } from "./item/item-sheet.js";
import { preloadHandlebarsTemplates } from "./helpers/templates.js";
import { MYTHPUNK } from "./helpers/config.js";

Hooks.once('init', function() {
    game.mythpunk = {
        MythpunkActor,
        MythpunkItem,
      };

      CONFIG.STARGAZER = STARGAZER;

        CONFIG.Combat.initiative = {
            formula: "1d10 + @skills.Reflex.value",
            decimals: 2
            };
    
        CONFIG.Actor.documentClass = MythpunkActor;
        CONFIG.Item.documentClass = MythpunkItem;
    
        Actors.unregisterSheet("core", ActorSheet);
        Actors.registerSheet("mythpunk", MythpunkActorSheet, { makeDefault: true });
        Items.unregisterSheet("core", ItemSheet);
        Items.registerSheet("mythpunk", MythpunkItemSheet, { makeDefault: true });
    
        return preloadHandlebarsTemplates();
    }
);
