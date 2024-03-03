export class Race_t {
    name: string;
    description: string = "";
    size: string = "";
    alignment: string = "";
    ability_bonuses: string[] = []; 
    language_desc:string = "common";
    age: string = "";
    speed: number = 0;

    constructor(name: string,size: string,alignment : string,ability_bonuses : string[],language_desc : string,age : string, speed:number) {
        this.name = name;
        this.size = size;
        this.ability_bonuses = ability_bonuses;
        this.age = age;
        this.language_desc = language_desc
        this.alignment = alignment
        this.description = age + " " + alignment + " " + language_desc
        this.speed=speed
    }    
}
