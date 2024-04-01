import "bootstrap/dist/css/bootstrap.css";
import "../extend.css"
import React, { useEffect, useState } from 'react';
import { Skill_t } from '../types/Skill_t';
import { Ability_t } from '../types/Ability_t'
import cloneDeep from 'lodash/fp/cloneDeep'



export function Stat({ abilities, set_abilities, skills, set_skills }: { abilities: Ability_t[], set_abilities: any, skills: Skill_t[], set_skills: any }) {

    // Function to display one ability
    const AbilityDisplay = ({ ability }: { ability: Ability_t }) =>
        <div className='d-inline-flex row my-2 text-center'>
            <h4>{ability.type}</h4>
            <input type='number' className="w-auto mx-auto" defaultValue={ability.value} min={3} max={20}
                // When we stop the focus on this input, we need to modify abilities
                onBlur={(event) => {
                    set_abilities((abilities: Ability_t[]) => {
                        let temp: Ability_t[] = cloneDeep(abilities);
                        let el: Ability_t = temp.find((el: Ability_t) => el.type === ability.type)!;
                        el.value = parseInt(event.target.value);
                        el.modificator = isNaN(parseInt(event.target.value)) ? 0 : Math.floor((parseInt(event.target.value) - 10) / 2);
                        return temp;
                    })
                }} />
            <h5>({ability.modificator})</h5>
        </div>

    // Function to display one skill
    const SkillDisplay = ({ skill,setter }: { skill: Skill_t, setter:any }) =>
        <div className='d-flex my-1 text-start'>
            <input className='me-2' type='checkbox' name={'proef_' + skill.name} checked={skill.proefficient}
                onChange={() =>
                    {
                    setter((skills: Skill_t[]) => {
                        let temp: Skill_t[] = cloneDeep(skills);
                        let skillToModify: Skill_t = temp.find((el) => el.name === skill.name)!
                        skillToModify.proefficient = !skillToModify.proefficient;
                        skillToModify.coeff += skillToModify.proefficient ? 2 : -2;
                        return temp;
                    })
                }
            }
            />
            {skill.name} ({skill.ability})
            <div className='px-2 ms-2 bg-black white'>{skill.coeff} </div>
        </div>


    useEffect(() => {
        // It will also change the skills since they depend of an ability modifier
        set_skills((skills: Skill_t[]) => {
            let temp: Skill_t[] = cloneDeep(skills);
            temp.forEach((skill: Skill_t) => {
                const ability = abilities.find((ability) => skill.ability === ability.type)
                skill.coeff = ability ? ability.modificator : 0;
                skill.coeff += skill.proefficient ? 2 : 0;
            })
            return temp
        })
    }, [abilities])

    // React Element to render
    return (
        <div className="App" >
            <div className='d-flex mx-2 w-50'>
                <div className='d-flex row'>
                    {abilities.map((ability) => <AbilityDisplay ability={ability} key={ability.type} />)}
                </div>
                <div className='d-flex row'>
                    {skills.map((skill: Skill_t) => <SkillDisplay skill={skill} setter={set_skills} key={skill.name} />)}
                </div>
            </div>
        </div>
    );
}
