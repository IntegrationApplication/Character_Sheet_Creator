import React from 'react';
import { Class_t } from '../types/Class_t';

interface ClassType {
    classInfo: Class_t;
    set_ClassSelected: (value: string) => void;
    classes: string[];
}

const DisplayClass = ({classInfo} : {classInfo: Class_t}) =>
    <div className=' mx-5 w-100 d-flex align-items-center jusitfy-content-around' key={classInfo.name}>
        <img className='m-2' src={`/img/${classInfo.name}.png`}/>
        <div className="card bg-black white p-3 m-2 w-50">
            <h2>{classInfo.name}</h2>
            <div className="text-start d-flex justify-content-between">
                <div className='d-flex flex-column justify-content- gap-3'>
                    <p><strong>Hit Die:</strong>{classInfo.hit_die}</p>
                    <div><strong>Equipement:</strong>
                        {classInfo.equipement.map((el, index) => <div key={index}>- {el}</div>)}
                    </div>
                    </div>
                    <div className='d-flex flex-column'>
                    <div>
                        <strong>Proficiencies:</strong>
                        {classInfo.proficiencies.map((el, index) => <div key={index}>- {el}</div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>

export function Class({ set_ClassSelected, classInfo, classes }: ClassType) {

  // Function to display all the classes
  const MenuDisplay = () => <div className='d-flex row w-25 white'>
  {classes.map((name, index) => <button className='brd-white white bg-black m-auto w-100' key={`classBtn${index}`} onClick={
      () => { set_ClassSelected(name) }
    }>{name}</button>)}
  </div>

  // React Element to display
  return (
    <div className='d-flex'>
      <MenuDisplay />
      <DisplayClass classInfo={classInfo}/>
    </div>
  );
}
