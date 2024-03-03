export class Class_t {
    name: string = "";
    description: string = "";
    hit_die: number = 6
    proficiencies: string[] = []
    equipement: string[] = [] 

    constructor(name: string,hit_die:number, proficiencies: string[],equipement: string[]) 
    {
        this.name = name;
        this.equipement = equipement;
        this.hit_die = hit_die
        this.proficiencies = proficiencies
    }
}
