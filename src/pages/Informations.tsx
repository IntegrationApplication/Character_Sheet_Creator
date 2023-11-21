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
    setVariable: (value: string) => void
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
    setVariable: (value: number) => void
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
    setCharacter: React.Dispatch<React.SetStateAction<Character_t>>;
}
export function Informations({ character, setCharacter }: InformationsType) {
    const errMsg: string = ""; // pour les erreurs sur le submit ?

    const submitInformations = (e: any) => {
        e.preventDefault();
        // console.log(character.name);
        // TODO
    }

    // NOTE: je sais pas si le form sert à qqch ici
    return (
        <div>
            <h2>Character's Informations</h2>

            <form className="mt-3" onSubmit={(e) => submitInformations(e)}>
                <TextForm desc="Name:" id="name" variable={character.name}
                    setVariable={(value: string) => {
                        let tmp: Character_t = { ...character };
                        tmp.name = value;
                        setCharacter(tmp);
                    }} />
                <NumberForm desc="Level:" id="level" maxValue={20} variable={character.level}
                    setVariable={(value: number) => {
                        let tmp: Character_t = { ...character };
                        tmp.level = value;
                        setCharacter(tmp);
                    }} />
                <NumberForm desc="HP:" id="hp" variable={character.hp}
                    setVariable={(value: number) => {
                        let tmp: Character_t = { ...character };
                        tmp.hp = value;
                        setCharacter(tmp);
                    }} />
                <NumberForm desc="HP max:" id="hpmax" variable={character.hpmax}
                    setVariable={(value: number) => {
                        let tmp: Character_t = { ...character };
                        tmp.hpmax = value;
                        setCharacter(tmp);
                    }} />
                <NumberForm desc="Initiative:" id="initiative" maxValue={20} variable={character.initiative}
                    setVariable={(value: number) => {
                        let tmp: Character_t = { ...character };
                        tmp.initiative = value;
                        setCharacter(tmp);
                    }} />
                <NumberForm desc="Spell save DC:" id="spellSaveDC" maxValue={20} variable={character.spellSaveDC}
                    setVariable={(value: number) => {
                        let tmp: Character_t = { ...character };
                        tmp.spellSaveDC = value;
                        setCharacter(tmp);
                    }} />
                <NumberForm desc="Spell casting ability:" id="spellCastAbility" maxValue={20} variable={character.spellCastAbility}
                    setVariable={(value: number) => {
                        let tmp: Character_t = { ...character };
                        tmp.spellCastAbility = value;
                        setCharacter(tmp);
                    }} />
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
