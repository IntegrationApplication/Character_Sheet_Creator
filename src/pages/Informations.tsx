import React, { useEffect, useState } from 'react';

/******************************************************************************/
/*                                 text form                                  */
/******************************************************************************/

// NOTE: this may be moved in it's own file (in a utility/form directory) if
// required
interface TextFormType {
    type: string
    desc: string,
    id: string,
    variable: any, // needs to be any as we can have multiple input type
    setVariable: React.Dispatch<React.SetStateAction<any>>,
}
const TextForm: React.FC<TextFormType> = ({ type, desc, id, variable, setVariable }) => {
    return (
        <label className="row mt-3" htmlFor="name">
            <div className="col">{desc}</div>
            <input className="col" type={type} id={id} value={variable}
                onChange={(e) => setVariable(e.target.value)}
                required>
            </input>
        </label>
    );
}

/******************************************************************************/
/*                                informations                                */
/******************************************************************************/

export function Informations() {
    // TODO: look how to use classes in order not to declare so much variables
    const [name, setName] = useState<string>("");
    const [level, setLevel] = useState<number>(0);
    const [hp, setHp] = useState<number>(0);
    const [hpMax, setHpMax] = useState<number>(0); // note: may use useEffect as it should be the same as HP on CS creation
    // const [hitDice, setHitDice] = useState<number>(0); // TODO
    const [initiative, setInitiative] = useState<number>(0);
    const [proefficiencyBunus, setProefficiencyBunus] = useState<number>(0);
    // NOTE: this may be moved in another section
    const [spellSaveDC, setSpellSaveDC] = useState<number>(0);
    const [spellCastAbility, setSpellCastAbility] = useState<number>(0);
    const errMsg: string = ""; // pour les erreurs sur le submit ?

    const submitInformations = (e: any) => {
        e.preventDefault();
        console.log(name);
        // TODO
    }

    // NOTE: je sais pas si le form sert à qqch ici
    return (
        <div>
            <h2>Character's Informations</h2>

            <form className="mt-3" onSubmit={(e) => submitInformations(e)}>
                <TextForm type="text" desc="Name:" id="name" variable={name} setVariable={setName} />
                <TextForm type="number" desc="Level:" id="level" variable={level} setVariable={setLevel} />
                <TextForm type="number" desc="HP:" id="hp" variable={hp} setVariable={setHp} />
                <TextForm type="number" desc="HP max:" id="hpmax" variable={hpMax} setVariable={setHpMax} />
                <TextForm type="number" desc="Initiative:" id="initiative" variable={initiative} setVariable={setInitiative} />
                <TextForm type="number" desc="Proefficiency bonus:" id="proefficiencyBunus" variable={proefficiencyBunus} setVariable={setProefficiencyBunus} />
                <TextForm type="number" desc="Spell save DC:" id="spellSaveDC" variable={spellSaveDC} setVariable={setSpellSaveDC} />
                <TextForm type="number" desc="Spell casting ability:" id="spellCastAbility" variable={spellCastAbility} setVariable={setSpellCastAbility} />
                <div>
                    <button
                        type="submit" className="btn btn-primary mt-3"
                        onSubmit={submitInformations}>passer la commande
                    </button>
                </div>
                <div className="warning">{errMsg}</div>
            </form>
        </div>
    );
}
