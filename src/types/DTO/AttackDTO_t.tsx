import { Attack_t } from '../Attack_t'
import { abilitiesNames, skillsNames } from '../Character_t'

export class AttackDTO_t {
    id: number = 0;
    name: string = "";
    linkedAbility: number = 0;
    damageType: string = "slash";
    nbDices: number = 1;
    dicesFaces: number = 6;
    damageBonus: number = 0;

    constructor(attack: Attack_t) {
        this.name = attack.name;
        this.linkedAbility = abilitiesNames.findIndex(elt => elt === attack.linkedAbility);
        this.damageType  = attack.damageType;
        this.nbDices = attack.nbDices
        this.dicesFaces = attack.dicesFaces;
        this.damageBonus = attack.damageBonus;
    }
}

