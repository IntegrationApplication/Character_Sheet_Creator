export class Attack_t {
    id: number = 0;
    linkedAbility: string = ""; // remplace with ability ?
    damageType: string = "";
    nbDices: number = 0;
    dicesFaces: number = 0;
    damageBonus: number = 0;

    constructor(linkedAbility: string, damageType: string, damageDice: [ number, number, number]) {
        this.linkedAbility = linkedAbility;
        this.damageType  = damageType;
        this.nbDices = damageDice[0];
        this.dicesFaces = damageDice[1];
        this.damageBonus = damageDice[2];
    }
}
