import { AttackDTO_t } from './DTO/AttackDTO_t'
import { abilitiesNames } from './Character_t'

export class Attack_t {
    id: number = 0;
    name: string = "";
    linkedAbility: string = "Strength";
    damageType: string = "slash";
    nbDices: number = 1;
    dicesFaces: number = 6;
    damageBonus: number = 0;

    fromDTO(dto: AttackDTO_t) {
        this.name = dto.name;
        this.linkedAbility = abilitiesNames[dto.linkedAbility];
        this.damageType  = dto.damageType;
        this.nbDices = dto.nbDices
        this.dicesFaces = dto.dicesFaces;
        this.damageBonus = dto.damageBonus;
    }
}
