export class Attack_t {
    id: number = 0;
    linkedAbility: string = "Strength";
    damageType: string = "slash";
    nbDices: number = 1;
    dicesFaces: number = 6;
    damageBonus: number = 0;

    constructor(linkedAbility: string, damageType: string, damageDice: [ number, number, number]) {
        this.linkedAbility = linkedAbility;
        this.damageType  = damageType;
        this.nbDices = damageDice[0];
        this.dicesFaces = damageDice[1];
        this.damageBonus = damageDice[2];
    }
}
