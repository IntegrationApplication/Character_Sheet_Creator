import "bootstrap/dist/css/bootstrap.css";
import "../extend.css"
import React, { useEffect, useState } from 'react';
import { Skill_t } from '../types/Skill_t';
import { Ability_t } from '../types/Ability_t'
import cloneDeep from 'lodash/fp/cloneDeep'



export function Stat() {
    // List of data
    const [abilities, set_abilities] = useState<Ability_t[]>([]);
    const [skills, set_skills] = useState<Skill_t[]>([]);

    // Initialize all the data from the dnd5e api 
    useEffect(() => {

        // Fetch list of abilities
        fetch("https://www.dnd5eapi.co/api/ability-scores/")
            .then((data: any) => data.json())
            .then((data: any) => {
                let temp: Ability_t[] = [];
                data.results.forEach((ability: any) => {
                    temp.push({ type: ability.name, value: 10, modificator: 0 });
                });
                set_abilities(temp);
            })

        //fetch list of skills
        fetch("https://www.dnd5eapi.co/api/skills")
            .then((data: any) => data.json())
            .then((data: any) => {
                const skillPromises = data.results.map((skill: any) =>

                    // to get the associate ability, we need another request
                    fetch("https://www.dnd5eapi.co/api/skills/" + skill.name.replace(/ /g, "-").toLowerCase())
                        .then((data: any) => data.json())
                        .then((data: any) => ({
                            name: skill.name,
                            ability: data.ability_score.name,
                            proefficient: false,
                            coeff: 0,
                        }))
                );

                return Promise.all(skillPromises)
            })
            .then((skills: Skill_t[]) => set_skills(skills))
    }, [])


    // Function to display one ability
    const AbilityDisplay = ({ ability }: { ability: Ability_t }) =>
        <div className='d-inline-flex row my-2 text-center'>
            <h4>{ability.type}</h4>
            <input type='number' className="w-auto mx-auto" defaultValue={ability.value} min={3} max={20}
                // When we stop the focus on this input, we need to modify abilities
                onBlur={(event) => {
                    set_abilities((abilities) => {
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
    const SkillDisplay = ({ skill }: { skill: Skill_t }) =>
        <div className='d-flex my-1 text-start'>
            <input className='me-2' type='checkbox' name={'proef_' + skill.name} checked={skill.proefficient}
                onChange={() =>
                    set_skills((skills: Skill_t[]) => {
                        let temp: Skill_t[] = cloneDeep(skills);
                        let skillToModify: Skill_t = temp.find((el) => el.name === skill.name)!
                        skillToModify.proefficient = !skillToModify.proefficient;
                        skillToModify.coeff += skillToModify.proefficient ? 2 : -2;
                        return temp;
                    })}
            />
            {skill.name} ({skill.ability})
            <div className='px-2 ms-2 bg-black white'>{skill.coeff} </div>
        </div>


    useEffect(() => {
        // It will also change the skills since they depend of an ability modifier
        set_skills((skills) => {
            let temp: Skill_t[] = cloneDeep(skills);
            skills.forEach((skill: Skill_t) => {
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
                    {skills.map((skill: Skill_t) => <SkillDisplay skill={skill} key={skill.name} />)}
                </div>
            </div>
        </div>
    );
}