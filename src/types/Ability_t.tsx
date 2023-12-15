//Represent an ability (ex: CHA)
export class Ability_t {
    type: string = "";
    value: number = 0;
    modificator: number = 0;
    proefficient: boolean = false;

    constructor(type: string, value: number, modificator: number, proefficient: boolean) {
        this.type = type;
        this.value = value;
        this.modificator = modificator;
        this.proefficient = proefficient;
    }
}
