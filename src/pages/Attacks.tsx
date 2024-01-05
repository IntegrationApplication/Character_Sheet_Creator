import { abilitiesNames, Character_t } from "../types/Character_t";
import { Attack_t } from "../types/Attack_t";
import Combobox from "react-widgets/Combobox";
import React, { useState } from 'react';

interface AttackFormType {
    index: number;
    character: Character_t;
}
const AttackForm: React.FC<AttackFormType> = ({ index, character }) => {
    const [name, setName] = useState<string>("name");
    const [linkedAbility, setLinkedAbility] = useState<string>("Strength");
    const [damageType, setDamageType] = useState<string>("slash");
    const [nbDices, setNbDices] = useState<number>(1);
    const [dicesFaces, setDicesFaces] = useState<number>(6);
    // note: we could compute the damage bonus automatically
    const [damageBonus, setDamageBonus] = useState<number>(0);

    // note: la combobox est buguée
    return (
        <div className="row mt-3" key={`attack${index}`}>
            <input className="col" type="string" key="name" value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    character.Attacks[index].name = e.target.value;
                }}
                required>
            </input>
            <Combobox
                key="linkedAbility"
                data={abilitiesNames}
                value={linkedAbility}
                onChange={ value => {
                    setLinkedAbility(value);
                    character.Attacks[index].linkedAbility = value;
                }} />
            <input className="col" type="string" key="damageType" value={damageType}
                onChange={(e) => {
                    setDamageType(e.target.value);
                    character.Attacks[index].damageType = e.target.value;
                }}
                required>
            </input>
            <input className="col" type="number" key="nbDices" value={nbDices}
                onChange={(e) => {
                    setNbDices(+e.target.value);
                    character.Attacks[index].nbDices = +e.target.value;
                }}
                required>
            </input>
            <input className="col" type="number" key="dicesFaces" value={dicesFaces}
                onChange={(e) => {
                    setDicesFaces(+e.target.value);
                    character.Attacks[index].dicesFaces = +e.target.value;
                }}
                required>
            </input>
            <input className="col" type="number" key="damageBonus" value={damageBonus}
                onChange={(e) => {
                    setDamageBonus(+e.target.value);
                    character.Attacks[index].damageBonus = +e.target.value;
                }}
                required>
            </input>
        </div>
    );
}

/******************************************************************************/
/*                                  attacks                                   */
/******************************************************************************/

interface AttacksType {
    character: Character_t;
    setCharacter: React.Dispatch<React.SetStateAction<Character_t>>;
}
export function Attacks({ character, setCharacter }: AttacksType) {
    const [ nbAttacks, setNbAttacks ] = useState<number>(character.Attacks.length);

    const AttacksDisplay = () => {
        let idx = -1;
        return (
                <>
                {
                    character.Attacks.map(elt => {
                        idx++;
                        return (
                            <AttackForm index={idx} character={character} />
                        );
                    })
                }
                </>
            )
    }

    // todo: create a table to describe each input
    return (
        <>
            <h2>Character's Attacks</h2>

            <AttacksDisplay />

            <button onClick={() => {
                let attack = new Attack_t();
                character.Attacks.push(attack);
                setNbAttacks(nbAttacks + 1);
            }}>new weapon</button>
        </>
    );
}
