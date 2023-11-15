import { Ability_t } from "./Ability";
import { Skill_t } from "./Skill_t";

export type Character_t = {
    id: number,
    name: string,
    level: number,
    ac: number,
    hp: number,
    hpmax: number,
    hitdice: [ number, number ],
    spellSaveDC: number,
    spellCastAbility: number,
    initiative: number,
    proefficiencyBunus: number,
    skills: Array<Skill_t>,
    abilities: Array<Ability_t>,
    attacks: Array<Attack_t>,
    spell: Array<Spell_t>,
}
