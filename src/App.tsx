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
const characterApiHost = "http://0.0.0.0:8080/Character";

/******************************************************************************/
/* Functions                                                                  */
/******************************************************************************/

const fetchCharacterDto = async (idGame: string, idPlayer: string): Promise<CharacterDTO_t> => {
  // the type of the json object match CharacterDTO_t
  return fetch(`${characterApiHost}/GetCharacter?idPlayer=${idPlayer}&idGame=${idGame}`)
      .then((data: any) => {
              let characterDTO = new CharacterDTO_t();
              let jsonObject = data.json();
              characterDTO = jsonObject;
              console.log(characterDTO);
              return characterDTO;
              });
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
        let bonuses :string[] = [];
        if (data.ability_bonuses !== undefined )
          bonuses = data.ability_bonuses.map(
        (el:any) =>
          `bonus for ${el.ability_score.name} of ${el.bonus}`)
        set_raceInfo(new Race_t(data.name,data.size,data.alignment,bonuses, data.language_desc,data.age,data.speed))
      })
}

const updateClassInfo = (
        set_classInfo: React.Dispatch<React.SetStateAction<Class_t>>,
        classSelected: string
        ) => {
    fetch(`https://www.dnd5eapi.co/api/classes/${classSelected}`)
      .then((data: any) => data.json())
      .then((data: any) => {
        console.log(data);
        let equipements : string[] = [];
        let proficiencies: string[] = [];
        if (data.proficiencies !== undefined)
        {
          equipements = data.starting_equipment.map((el: any) => el.equipment.name)
          proficiencies = data.proficiencies.map((el:any) => el.name);
        }
        set_classInfo(new Class_t(data.name,data.hit_die,proficiencies,equipements))
      })
}

const saveCharacter = (idGame: string, idPlayer: string, characterDTO: CharacterDTO_t) => {
    console.log(idGame);
    console.log(idPlayer);
    console.log(characterDTO);
  fetch(`${characterApiHost}/UpdateCharacter?idPlayer=${idPlayer}&idGame=${idGame}`, {
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
    const idGame = queryParameters.get("idGame") ?? "1";
    const idPlayer = queryParameters.get("idPlayer") ?? "1";
    return { idGame, idPlayer };
}

const updateStats = (
        setAbilities: React.Dispatch<React.SetStateAction<Ability_t[]>>,
        setSkills: React.Dispatch<React.SetStateAction<Skill_t[]>>,
        character: Character_t
) => {
    let savings = new Array<Skill_t>();

    character.Abilities.forEach((ability) => {
        savings.push(new Skill_t(`saving throw ${ability.type}`,
                    ability.type,
                    ability.proefficient,
                    ability.modificator))
    });
    setAbilities(character.Abilities);
    setSkills(character.Skills);
}

/******************************************************************************/
/* App                                                                        */
/******************************************************************************/

function App() {
  // Number to represent the menu display
  const [menu_index, set_menu_index] = useState<number>(0);

  // List of data
  const [abilities, setAbilities] = useState<Ability_t[]>([]);
  const [skills, setSkills] = useState<Skill_t[]>([]);
  const [races, setRaces] = useState<string[]>([]);
  const [raceSelected, setRaceSelected] = useState<string>("");
  const [raceInfo, setRaceInfo] = useState<Race_t>(new Race_t("","","",[],"","",0));
  const [classes, setClasses] = useState<string[]>([]);
  const [classSelected, setClassSelected] = useState<string>("");
  const [classInfo, setClassInfo] = useState<Class_t>(new Class_t("",0,[],[]));

  // get idGame and idPlayer from the url generated by the bot
  const { idGame, idPlayer } = getUrlParams();

  // fetch the character from the backend (it's a CharacterDTO_t)
  const [character, setCharacter] = useState<Character_t>(new Character_t());
  useEffect(() => {
      fetchCharacterDto(idGame, idPlayer)
          .then(characterDTO => {
              console.log("character before convertion into dto");
              console.log(character);
              console.log("character dto");
              console.log(characterDTO);
              character.fromDTO(characterDTO);
              // update the race and the class
              setRaceSelected(character.Race.name);
              setClassSelected(character.Class.name);
              console.log(character);
              updateStats(setAbilities, setSkills, character);
          })
          .catch(error => console.log(error) );
  }, []);

  // helper function used before sending the character to the backend
  const updateCharacter = () => {
      character.Abilities = abilities;
      character.Skills = skills;
      character.Race = raceInfo;
      character.Class = classInfo;
  };

  // Initialize all the data from the dnd5e api
  useEffect(() => {
    fetchRaces(setRaces);
    fetchClasses(setClasses);
  }, [])
  useEffect(() => {
    updateRaceInfo(setRaceInfo, raceSelected);
    character.Race = raceInfo;
  }, [raceSelected]);
  useEffect(() => {
    updateClassInfo(setClassInfo, classSelected);
    character.Class = classInfo;
  }, [classSelected])

  // Function to represent the menu
  const MenuDisplay = () => {
      return (
          <div className='d-flex white'> {
                  Menu.map((el, index) =>
                          <button className='brd-white white bg-black m-auto w-100' key={`menuBtnLink${index}`}
                                  onClick={ () => { set_menu_index(index) } }>{el}</button>)
              }
          </div>);
  }

  // React Element to display
  return (
    <div className="App" >
        <MenuDisplay />
      <div className='d-flex mx-2'>
        <div className='d-flex row ms-5'>
          {menu_index === 0 && <Race raceInfo={raceInfo} set_raceSelected={setRaceSelected} races={races} />}
          {menu_index === 1 && <Class classes={classes} classInfo={classInfo} set_ClassSelected={setClassSelected} />}
          {menu_index === 2 && <Stat abilities={abilities} set_abilities={setAbilities} skills={skills} set_skills={setSkills} />}
          {menu_index === 3 && <Attacks character={character} setCharacter={setCharacter}/>}
          {menu_index === 4 && <Informations character={character} setCharacter={setCharacter}/>}
        </div>

      </div>
      <button onClick={
        () => {
          updateCharacter(); // update the class, ...
          let characterDTO = new CharacterDTO_t();
          characterDTO.fromCharacter(character);
          characterDTO.idGame = idGame;
          characterDTO.idPlayer = idPlayer;
          console.log("send this dto to db:");
          console.log(characterDTO);

          saveCharacter(idGame, idPlayer, characterDTO);
        }}> Valider Personnage </button>
    </div>
  );
}

export default App;
