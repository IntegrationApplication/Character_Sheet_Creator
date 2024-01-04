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
        <label className="row mt-3">
            <div className="col">{desc}</div>
            <input className="col" type="string" id={id} value={variable}
                onChange={ (e) => { setVariable(e.target.value); } }
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
        <label className="row mt-3">
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
    // state variables
    const [name, setName] = useState(character.Name);
    const [level, setLevel] = useState(character.Level);
    const [hp, setHp] = useState(character.Hp);
    const [hpMax, setHpMax] = useState(character.HpMax);
    const [initiative, setInitiative] = useState(character.Initiative);
    const [spellSaveDC, setSpellSaveDC] = useState(character.SpellSaveDC);
    const [spellCastAbility, setSpellCastAbility] = useState(character.SpellCastAbility);

    return (
        <div>
            <h2>Character's Informations</h2>

            <TextForm desc="Name:" id="name" variable={name}
                setVariable={(value: string) => {
                    setName(value);
                    character.Name = value;
                    // setCharacter(character);
                }} />
            <NumberForm desc="Level:" id="level" maxValue={20} variable={level}
                setVariable={(value: number) => {
                    setLevel(value);
                    character.Level = value;
                    // setCharacter(character);
                }} />
            <NumberForm desc="HP:" id="hp" variable={hp}
                setVariable={(value: number) => {
                    setHp(value);
                    character.Hp = value;
                    // setCharacter(character);
                }} />
            <NumberForm desc="HP max:" id="hpmax" variable={hpMax}
                setVariable={(value: number) => {
                    setHpMax(value);
                    character.HpMax = value;
                    // setCharacter(character);
                }} />
            <NumberForm desc="Initiative:" id="initiative" maxValue={20} variable={initiative}
                setVariable={(value: number) => {
                    setInitiative(value);
                    character.Initiative = value;
                    // setCharacter(character);
                }} />
            <NumberForm desc="Spell save DC:" id="spellSaveDC" maxValue={20} variable={spellSaveDC}
                setVariable={(value: number) => {
                    setSpellSaveDC(value);
                    character.SpellSaveDC = value;
                    // setCharacter(character);
                }} />
            <NumberForm desc="Spell casting ability:" id="spellCastAbility" maxValue={20} variable={spellCastAbility}
                setVariable={(value: number) => {
                    setSpellCastAbility(value);
                    character.SpellCastAbility = value;
                    // setCharacter(character);
                }} />
        </div>
    );
}
