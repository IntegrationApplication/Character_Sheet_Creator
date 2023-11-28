import React, { useEffect, useState } from 'react';
import { Race_t } from '../types/Race_t';

export function Race({ races, raceSelected, set_raceSelected, raceInfo, set_raceInfo }: { races: string[], raceSelected: string, set_raceSelected: any, raceInfo: Race_t, set_raceInfo: any }) {

  // Function to display all the races
  const MenuDisplay = () => <div className='d-flex row w-25'>
    {races.map((name, index) => <button className='btn btn-primary mx-auto my-2' onClick={
      () => {
        set_raceSelected(name)
      }
    }>{name}</button>)}
  </div>

  // React Element to display
  return (
    <div className='d-flex'>
      <MenuDisplay />
      <div className='m-auto w-50'>{raceInfo.description}</div>
    </div>
  );
}
