import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "./extend.css"
import React, { useState, useEffect } from 'react';
import { Stat } from './pages/Stats';
import { Race } from './pages/Races';
import { Attacks } from './pages/Attacks';
import { Informations } from './pages/Informations';
import { Class } from './pages/Classes';
import { Character_t } from './types/Character_t';
import { Ability_t } from './types/Ability_t';
import { Skill_t } from './types/Skill_t';
import { Race_t } from './types/Race_t';
import { Class_t } from './types/Class_t';
import { CharacterDTO_t } from './types/DTO/CharacterDTO_t';

/******************************************************************************/
/* Variables                                                                  */
/******************************************************************************/

const Menu = ["Race", "Class", "Stats", "Attacks", "Infos"];
const characterApiHost = "https://localhost:7145/Character";

/******************************************************************************/
/* Functions                                                                  */
/******************************************************************************/

const fetchCharacterDto = async (idGame: number, idPlayer: number): Promise<CharacterDTO_t> => {
  // the type of the json object match CharacterDTO_t
  return fetch(`${characterApiHost}/GetCharacter?idPlayer=${idGame}&idGame=${idPlayer}`)
      .then((data: any) => {
              let characterDTO = new CharacterDTO_t();
              let jsonObject = data.json();
              characterDTO = jsonObject;
              console.log("The characterDTO has been gotten from the api:");
              console.log(characterDTO);
              return characterDTO;
              });
}

const fetchAbilitiesAndSavings = (
        set_abilities: React.Dispatch<React.SetStateAction<Ability_t[]>>,
        set_savings: React.Dispatch<React.SetStateAction<Skill_t[]>>) => {
    fetch("https://www.dnd5eapi.co/api/ability-scores/")
      .then((data: any) => data.json())
      .then((data: any) => {
        let temp: Array<Ability_t> = [];

        data.results.forEach((ability: any) => {
          temp.push(new Ability_t(ability.name, 10, 0, false));
        });
        set_abilities(temp);

        let skill_temp = temp.map(ability => {
          return {
            name: ability.type + "_saving_throw",
            ability: ability.type,
            proefficient: false,
            coeff: 0,
          }
        }
        )
        set_savings(skill_temp)
      })
}

const fetchSkills = (
        set_skills: React.Dispatch<React.SetStateAction<Skill_t[]>>) => {
    fetch("https://www.dnd5eapi.co/api/skills")
      .then((data: any) => data.json())
      .then((data: any) => {
        let skillPromises = data.results.map((skill: any) =>

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
      .then((skills: Skill_t[]) => {
        set_skills(skills)
      })
}

const fetchRaces = (
        set_races: React.Dispatch<React.SetStateAction<string[]>>
        ) => {
    let temp: string[];
    fetch("https://www.dnd5eapi.co/api/races")
      .then((data: any) => data.json())
      .then((data: any) => {
        temp = data.results.map((races: any) => races.index)
        set_races(temp)
      })
}

const fetchClasses = (
        set_classes: React.Dispatch<React.SetStateAction<string[]>>
        ) => {
    let temp: string[];
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((data: any) => data.json())
      .then((data: any) => {
        temp = data.results.map((races: any) => races.index)
        set_classes(temp)
      })
}

const updateRaceInfo = (
        set_raceInfo: React.Dispatch<React.SetStateAction<Race_t>>,
        raceSelected: string
        ) => {
    fetch(`https://www.dnd5eapi.co/api/races/${raceSelected}`)
      .then((data: any) => data.json())
      .then((data: any) => {
        console.log(data);
        set_raceInfo({ name: raceSelected, description: `${data.alignment} ${data.language_desc} ${data.size_description}` })
      })
}

const updateClassInfo = (
        set_classInfo: React.Dispatch<React.SetStateAction<Race_t>>,
        classSelected: string
        ) => {
    fetch(`https://www.dnd5eapi.co/api/classes/${classSelected}`)
      .then((data: any) => data.json())
      .then((data: any) => {
        set_classInfo({ name: classSelected, description: `${data.proficiencies?.map((el: any) => `${el.name} `)}` })
      })
}

const saveCharacter = (idGame: number, idPlayer: number, characterDTO: CharacterDTO_t) => {
  fetch(`${characterApiHost}/UpdateCharacter?idPlayer=${idGame}&idGame=${idPlayer}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(characterDTO) // we update the remote character using the DTO
    });
}

const getUrlParams = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const idGame = parseInt(queryParameters.get("idGame") ?? "1");
    const idPlayer = parseInt(queryParameters.get("idPlayer") ?? "1");
    return { idGame, idPlayer };
}

/******************************************************************************/
/* App                                                                        */
/******************************************************************************/

function App() {
  // Number to represent the menu display
  const [menu_index, set_menu_index] = useState<number>(0);

  // List of data
  const [abilities, set_abilities] = useState<Ability_t[]>([]);
  const [skills, set_skills] = useState<Skill_t[]>([]);
  const [savings, set_savings] = useState<Skill_t[]>([]);
  const [races, set_races] = useState<string[]>([]);
  const [raceSelected, set_raceSelected] = useState<string>("");
  const [raceInfo, set_raceInfo] = useState<Race_t>({ name: "", description: "" });
  const [classes, set_classes] = useState<string[]>([]);
  const [classSelected, set_ClassSelected] = useState<string>("");
  const [classInfo, set_classInfo] = useState<Class_t>({ name: "", description: "" });

  // get idGame and idPlayer from the url generated by the bot
  const { idGame, idPlayer } = getUrlParams();

  // fetch the character from the backend (it's a CharacterDTO_t)
  const [character, setCharacter] = useState<Character_t>(new Character_t());
  useEffect(() => {
      fetchCharacterDto(idGame, idPlayer)
          .then(characterDTO => {
              character.fromDTO(characterDTO);
              // update the race and the class
              set_raceSelected(character.Race.name);
              set_ClassSelected(character.Class.name);
          })
          .catch(error => console.log(error) );
  }, []);

  // helper function used before sending the character to the backend
  const updateCharacter = () => {
      character.Abilities = abilities;
      character.Skills = skills;
      character.Race = new Race_t(raceSelected);
      character.Class = new Class_t(classSelected);
  };

  // Initialize all the data from the dnd5e api
  useEffect(() => {
    fetchAbilitiesAndSavings(set_abilities, set_savings);
    fetchSkills(set_skills);
    fetchRaces(set_races);
    fetchClasses(set_classes);
  }, [])
  useEffect(() => updateRaceInfo(set_raceInfo, raceSelected), [raceSelected]);
  useEffect(() => updateClassInfo(set_classInfo, classSelected), [classSelected])

  // Function to represent the menu
  const MenuDisplay = () => <div className='d-flex row'>
    {Menu.map((el, index) => <button className='btn btn-primary m-auto' key={"menuBtn"+index} onClick={
      () => { set_menu_index(index) }
    }>{el}</button>)}
  </div>

  // React Element to display
  return (
    <div className="App" >
      <div className='d-flex mx-2'>
        <MenuDisplay />
        <div className='d-flex row w-75 ms-5'>
          {menu_index === 0 && <Race raceInfo={raceInfo} set_raceSelected={set_raceSelected} races={races} />}
          {menu_index === 1 && <Class classes={classes} classInfo={classInfo} set_ClassSelected={set_ClassSelected} />}
          {menu_index === 2 && <Stat abilities={abilities} set_abilities={set_abilities} skills={skills} set_skills={set_skills} />}
          {menu_index === 3 && <Attacks character={character} setCharacter={setCharacter}/>}
          {menu_index === 4 && <Informations character={character} setCharacter={setCharacter}/>}
        </div>

      </div>
      <button onClick={
        () => {
          updateCharacter(); // update the class, ...
          let characterDTO = new CharacterDTO_t();
          console.log("dto before change:");
          console.log(characterDTO);
          characterDTO.fromCharacter(character);
          console.log("-----------------------------------------");
          console.log("dto after change:");
          console.log(characterDTO);

          saveCharacter(idGame, idPlayer, characterDTO);
        }}> Valider Personnage </button>
    </div>
  );
}

export default App;
