import React, { useState } from 'react';
import { Character_t } from '../types/Character_t'

/******************************************************************************/
/*                                 text form                                  */
/******************************************************************************/

// NOTE: this may be moved in it's own file (in a utility/form directory) if
// required
interface TextFormType {
    desc: string,
    id: string,
    variable: string,
    setVariable: React.Dispatch<React.SetStateAction<any>>,
}
const TextForm: React.FC<TextFormType> = ({ desc, id, variable, setVariable }) => {
    return (
        <label className="row mt-3" htmlFor="name">
            <div className="col">{desc}</div>
            <input className="col" type="string" id={id} value={variable}
                onChange={(e) => setVariable(e.target.value)}
                required>
            </input>
        </label>
    );
}

interface NumberFormType {
    desc: string,
    id: string,
    maxValue?: number,
    variable: number,
    setVariable: React.Dispatch<React.SetStateAction<number>>,
}
const NumberForm: React.FC<NumberFormType> = ({ desc, id, maxValue, variable, setVariable }) => {
    return (
        <label className="row mt-3" htmlFor="name">
            <div className="col">{desc}</div>
            <input className="col" type="number" id={id} value={variable}
                onChange={(e) => {
                    let value: number = +e.target.value;
                    if (maxValue !== undefined && value > maxValue) {
                        value = maxValue;
                    } else if (value < 0) {
                        value = 0;
                    }
                    setVariable(value)
                }}
                required>
            </input>
        </label>
    );
}

/******************************************************************************/
/*                                informations                                */
/******************************************************************************/

interface InformationsType {
    character: Character_t;
    // note: je ne comprends pas comment ça marche pour ça, apparemment, le
    // Character_t peut être unedinfed dans les <> et je sais pas comment lui
    // dire que ça doit pas être le cas dans le App.
    setCharacter: React.Dispatch<React.SetStateAction<Character_t | undefined>>;
}
export function Informations({character, setCharacter}: InformationsType) {
    // TODO: look how to use classes in order not to declare so much variables
    const [level, setLevel] = useState<number>(0);
    const [hp, setHp] = useState<number>(0);
    const [hpMax, setHpMax] = useState<number>(0); // note: may use useEffect as it should be the same as HP on CS creation
    // const [hitDice, setHitDice] = useState<number>(0); // TODO
    const [initiative, setInitiative] = useState<number>(0);
    // NOTE: this may be moved in another section
    const [spellSaveDC, setSpellSaveDC] = useState<number>(0);
    const [spellCastAbility, setSpellCastAbility] = useState<number>(0);
    const errMsg: string = ""; // pour les erreurs sur le submit ?

    const submitInformations = (e: any) => {
        e.preventDefault();
        console.log(character.name);
        // TODO
    }

    // NOTE: je sais pas si le form sert à qqch ici
    return (
        <div>
            <h2>Character's Informations</h2>

            <form className="mt-3" onSubmit={(e) => submitInformations(e)}>
                <TextForm  desc="Name:" id="name" variable={character.name} setVariable={(value: string) => {
                    let tmp: Character_t = character;
                    character.name = value;
                    setCharacter(character);
                }} />
                <NumberForm desc="Level:" id="level" maxValue={20} variable={character.level} setVariable={setLevel} />
                <NumberForm desc="HP:" id="hp" variable={character.hp} setVariable={setHp} />
                <NumberForm desc="HP max:" id="hpmax" variable={character.hpMax} setVariable={setHpMax} />
                <NumberForm desc="Initiative:" id="initiative" maxValue={20} variable={character.initiative} setVariable={setInitiative} />
                <NumberForm desc="Spell save DC:" id="spellSaveDC" maxValue={20} variable={character.spellSaveDC} setVariable={setSpellSaveDC} />
                <NumberForm desc="Spell casting ability:" id="spellCastAbility" maxValue={20} variable={character.spellCastAbility} setVariable={setSpellCastAbility} />
                <div>
                    <button
                        type="submit" className="btn btn-primary mt-3"
                        onSubmit={submitInformations}>TODO: remove this button
                        and make a global form
                    </button>
                </div>
                <div className="warning">{errMsg}</div>
            </form>
        </div>
    );
}
