import { Attack_t } from "./Attack_t";
import { Character_t } from "./Character_t";

export class CharacterDTO_t {
    id: number = 0;
    idGame: number = 0;
    idPlayer: number = 0;
    name: string = "";
    className: string = "";
    raceName: string = "";
    level: number = 0;
    ac: number = 0;
    spellSaveDC: number = 0;
    speelCastAbility: number = 0;
    initiative: number = 0;
    hp: number = 0;
    hpMax: number = 0;
    hitDiceNumber: number = 0;
    hitDiceValue: number = 0;
    stats: Array<number> = [];
    skills: Array<number> = [];
    proefficiencies: Array<boolean> = [];
    attacks: Array<Attack_t> = [];
    proefficiencyBonus: number = 0;
    passivePerception: number = 0;

    fromCharacter(this: CharacterDTO_t, character: Character_t) {
        // TODO: update fields using character
    }
}
