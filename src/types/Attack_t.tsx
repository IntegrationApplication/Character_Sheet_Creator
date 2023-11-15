export class Attack_t {
    linkedAbility: string = ""; // remplace with ability ?
    damageType: string = "";
    damageDice: [ number, number, number ] = [ 0, 0, 0 ];

    constructor(linkedAbility: string, damageType: string, damageDice: [ number, number, number]) {
        this.linkedAbility = linkedAbility;
        this.damageType  = damageType;
        this.damageDice = damageDice;
    }
}
