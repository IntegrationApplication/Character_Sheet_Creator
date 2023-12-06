// Represent a skill (ex: perception)
export class Skill_t {
    name: string = "";
    ability: string = "";  // the ability to use the modifier
    proefficient: boolean = false;
    coeff: number = 0;

    constructor(name: string, ability: string, proefficient: boolean, coeff: number) {
        this.name = name;
        this.ability = ability;
        this.proefficient = proefficient;
        this.coeff = coeff;
    }
}
