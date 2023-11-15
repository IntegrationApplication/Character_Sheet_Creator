import { Ability_t } from "./Ability_t";
import { Attack_t } from "./Attack_t";
import { Skill_t } from "./Skill_t";
import { Spell_t } from "./Spell_t";

export class Character_t {
    id: number;
    name: string = "";
    level: number = 1;
    ac: number = 0;
    hp: number = 0;
    hpmax: number = 0;
    hitdice: [ number, number ] = [ 0, 0 ];
    spellSaveDC: number = 0;
    spellCastAbility: number = 0;
    initiative: number = 0;
    proefficiencyBunus: number = 0;
    skills: Array<Skill_t> = [];
    abilities: Array<Ability_t> = []
    attacks: Array<Attack_t> = [];
    spell: Array<Spell_t> = [];

    constructor(id: number) {
        this.id = id;
    }
}
