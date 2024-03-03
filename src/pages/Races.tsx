import React, { useEffect, useState } from 'react';
import { Race_t } from '../types/Race_t';

interface RaceType {
    races: string[];
    set_raceSelected: any;
    raceInfo: Race_t;
}

const DisplayRace = ({raceInfo} : {raceInfo: Race_t}) =>
 <div className=' mx-5 w-100 d-flex align-items-center jusitfy-content-around'> 
 <img className='m-2' src={`/img/${raceInfo.name}.png`}/>
 <div className="card bg-black white p-3 m-2 w-50">
      <h2>{raceInfo.name}</h2>
        <p><strong>Alignment:</strong> {raceInfo.alignment}</p>
        <p><strong>Languages:</strong> {raceInfo.language_desc}</p>
        <p><strong>Age:</strong> {raceInfo.age}</p>

        <div className="text-start container">
        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column'>
            <p><strong>Size:</strong> {raceInfo.size}</p>
            <p><strong>Speed:</strong> {raceInfo.speed} feet</p>
          </div>
        <p><strong>Ability Bonuses:</strong>
        {raceInfo.ability_bonuses.map(el => <p>- {el}</p>)}</p>
        </div>
      </div>
    </div>
</div>

export function Race({ races, set_raceSelected, raceInfo }: RaceType) {

  // Function to display all the races
  const MenuDisplay = () => <div className='d-flex row w-25 white'>
    {races.map((name, index) => <button className='brd-white white bg-black m-auto w-100' key={`raceBtn${index}`} onClick={
      () => {
        set_raceSelected(name)
      }
    }>{name}</button>)}
  </div>

  // React Element to display
  return (
    <div className='d-flex'>
      <MenuDisplay />
      <DisplayRace raceInfo={raceInfo}/>
    </div>
  );
}
