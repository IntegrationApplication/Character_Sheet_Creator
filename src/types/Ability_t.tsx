//Represent an ability (ex: CHA)
export class Ability_t {
    type: string = "";
    value: number = 0;
    modificator: number = 0;

    constructor(type: string, value: number, modificator: number) {
        this.type = type;
        this.value = value;
        this.modificator = modificator;
    }
}
