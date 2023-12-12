import { Ability_t } from "./Ability_t";
import { Attack_t } from "./Attack_t";
import { Race_t } from "./Race_t";
import { Skill_t } from "./Skill_t";
import { Spell_t } from "./Spell_t";
import { Class_t } from "./Class_t";
import { CharacterDTO_t } from "./CharacterDTO_t";

export class Character_t {
    Id: number = 0;
    Name: string = "";
    level: number = 1;
    Class: Class_t;
    Ac: number = 0;
    Hp: number = 0;
    HpMax: number = 0;
    hitdice: [number, number] = [0, 0];
    SpellSaveDC: number = 0;
    SpellCastAbility: number = 0;
    Initiative: number = 0;
    ProefficiencyBunus: number = 0;
    Skills: Array<Skill_t> = [];
    Abilities: Array<Ability_t> = [];
    Attacks: Array<Attack_t> = [];
    Spell: Array<Spell_t> = [];
    Race: Race_t = { name: "", description: "" };

    constructor(dto: CharacterDTO_t) {
        this.Id = dto.ID;
        this.Name = dto.Name;
        this.level = dto.Level;
        this.Class = new Class_t(dto.ClassName);
        this.Ac = dto.Ac;
        this.Hp = dto.Hp;
        this.HpMax = dto.HpMax;
        this.hitdice = [ dto.HitDiceNumber, dto.HitDiceValue ];
        this.SpellSaveDC = dto.SpellSaveDC;
        this.SpellCastAbility = dto.SpeelCastAbility;
        this.Initiative = dto.Initiative;
        this.ProefficiencyBunus = dto.ProefficiencyBonus;

        for (let i = 0; i < 6; ++i) {
            // TODO: update skills
        }

        for (let i = 0; i < 6; ++i) {
            // TODO: update abilities
        }

        this.Race = new Race_t(dto.RaceName);
    }
}
