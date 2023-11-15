import { Attack_t } from "./Attack_t"

export class Spell_t extends Attack_t {
    description: string = "";

    constructor(linkedAbility: string, damageType: string, damageDice: [ number, number, number]) {
        super(linkedAbility, damageType, damageDice);
    }
}
