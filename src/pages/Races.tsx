import React, { useEffect, useState } from 'react';
import { Race_t } from '../types/Race_t';

export function Race() {
  const [races, set_races] = useState<string[]>([]);
  const [raceSelected,set_raceSelected] = useState<string>("");
  const [raceInfo, set_raceInfo] = useState<Race_t>({name:"name",description:"description"})
  
  // Function to display all the races
  const MenuDisplay = () => <div className='d-flex row w-25'>
    {races.map((name, index) => <button className='btn btn-primary mx-auto my-2' onClick={
      () => { set_raceSelected(name)}
    }>{name}</button>)}
  </div>

  useEffect(() => {
    let temp: string[];
    fetch("https://www.dnd5eapi.co/api/races")
    .then((data:any) => data.json())
    .then((data:any) => {
      temp = data.results.map((races:any) => races.index)
      set_races(temp)
    }) 
  }, [])

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/races/${raceSelected}`)
    .then((data:any) => data.json())
    .then((data:any) => {
      set_raceInfo({name:raceSelected,description:`${data.alignment} ${data.language_desc} ${data.size_description}`})
    }) 
  }, [raceSelected])

  // React Element to display
  return (
    <div className='d-flex'>
      <MenuDisplay/>
      <div className='m-auto w-50'>{raceInfo.description}</div>
    </div>
  );
}
