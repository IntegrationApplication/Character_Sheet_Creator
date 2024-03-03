import { Ability_t } from "./Ability_t";
import { Attack_t } from "./Attack_t";
import { Race_t } from "./Race_t";
import { Skill_t } from "./Skill_t";
import { Spell_t } from "./Spell_t";
import { Class_t } from "./Class_t";
import { CharacterDTO_t } from "./DTO/CharacterDTO_t";

export const computeModificator = (value: number) => {
    return Math.ceil((value - 10) / 2.0);
}

/******************************************************************************/
/* variables                                                                  */
/******************************************************************************/

export const abilitiesNames: Array<string> = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
];

export const skillsNames: Array<[string, string]> = [
    [ "Acrobatics", abilitiesNames[1] ],
    [ "Animal_handling", abilitiesNames[4] ],
    [ "Arcana", abilitiesNames[3] ],
    [ "Athletics", abilitiesNames[0] ],
    [ "Deception", abilitiesNames[5] ],
    [ "History", abilitiesNames[3] ],
    [ "Insight", abilitiesNames[4] ],
    [ "Intimidation", abilitiesNames[5] ],
    [ "Investigation", abilitiesNames[3] ],
    [ "Medicine", abilitiesNames[4] ],
    [ "Nature", abilitiesNames[3] ],
    [ "Perception", abilitiesNames[4] ],
    [ "Performance", abilitiesNames[5] ],
    [ "Persuasion", abilitiesNames[5] ],
    [ "Religion", abilitiesNames[3] ],
    [ "Sleight_of_hand", abilitiesNames[1] ],
    [ "Stealth", abilitiesNames[1] ],
    [ "Survival", abilitiesNames[4] ],
]

/******************************************************************************/
/* Character_t                                                                */
/******************************************************************************/

export class Character_t {
    Id: number = 0;
    Name: string = "";
    Level: number = 1;
    Class: Class_t = new Class_t("",0,[],[]);
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
    Race: Race_t = new Race_t("","","",[],"","",0);

    fromDTO(this: Character_t, dto: CharacterDTO_t) {
        this.Id = dto.id;
        this.Name = dto.name;
        this.Level = dto.level;
        this.Class = new Class_t("",0,[],[]);
        this.Ac = dto.ac;
        this.Hp = dto.hp;
        this.HpMax = dto.hpMax;
        this.hitdice = [ dto.hitDiceNumber, dto.hitDiceValue ];
        this.SpellSaveDC = dto.spellSaveDC;
        this.SpellCastAbility = dto.spellCastAbility;
        this.Initiative = dto.initiative;
        this.ProefficiencyBunus = dto.proefficiencyBonus;

        // update attacks
        this.Attacks = [];
        dto.attacks.forEach(attack => {
            let newAttack = new Attack_t();
            newAttack.fromDTO(attack);
            this.Attacks.push(newAttack);
        })

        // update stats
        for (let i = 0; i < 6; ++i) {
            this.Abilities.push(new Ability_t(
                        abilitiesNames[i],
                        dto.stats[i],
                        computeModificator(dto.stats[i]),
                        dto.proefficiencies[i]));
        }

        // update skills (i starts at 6 as we skip the saving throws)
        for (let i = 6; i < 24; ++i) {
            this.Skills.push(new Skill_t(
                        skillsNames[i - 6][0],
                        skillsNames[i - 6][1],
                        dto.proefficiencies[i],
                        dto.skills[i]));
        }

        this.Race = new Race_t(dto.raceName,"","",[],"","",0);
    }
}
