import { Attack_t } from "./Attack_t";
import { Character_t } from "./Character_t";

export class CharacterDTO_t {
    ID: number = 0;
    IdGame: number = 0;
    IdPlayer: number = 0;
    Name: string = "";
    ClassName: string = "";
    RaceName: string = "";
    Level: number = 0;
    Ac: number = 0;
    SpellSaveDC: number = 0;
    SpeelCastAbility: number = 0;
    Initiative: number = 0;
    Hp: number = 0;
    HpMax: number = 0;
    HitDiceNumber: number = 0;
    HitDiceValue: number = 0;
    Stats: Array<number> = [];
    Proefficiencies: Array<boolean> = [];
    Attacks: Array<Attack_t> = [];
    ProefficiencyBonus: number = 0;
    PassivePerception: number = 0;

    constructor(idGame: number, idPlayer: number) {
        this.IdGame = idGame;
        this.IdPlayer = idPlayer;
    }

    fromCharacter(this: CharacterDTO_t, character: Character_t) {
        // TODO: update fields using character
    }
}
