import React, { useEffect, useState } from 'react';

interface TextFormType {
    desc: string,
    id: string,
    variable: string,
    setVariable: React.Dispatch<React.SetStateAction<string>>,
}
const TextForm: React.FC<TextFormType> = ({desc, id, variable, setVariable}) => {
    return (
        <label className="row mt-3" htmlFor="name">
            <div className="col">{desc}</div>
            <input className="col" type="text" id={id} value={variable}
                onChange={(e) => setVariable(e.target.value)}
                required>
            </input>
        </label>
    );
}

export function Informations() {
    const [name, setName] = useState("");
    const errMsg: string = ""; // pour les erreurs sur le submit ?

    const submitInformations = (e: any) => {
        e.preventDefault();
        console.log("submit");
    }

    // NOTE: je sais pas si le form sert à qqch ici
    return (
        <div>
            <h2>Character's Informations</h2>

            <form className="mt-3" onSubmit={(e) => submitInformations(e)}>
                <TextForm desc="Name:" id="name" variable={name} setVariable={setName} />
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
