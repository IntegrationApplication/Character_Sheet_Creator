import React, { useEffect, useState } from 'react';
import { Class_t } from '../types/Class_t';

export function Class() {
    const [classes, set_classes] = useState<string[]>([]);
    const [classSelected,set_ClassSelected] = useState<string>("");
    const [classInfo, set_classInfo] = useState<Class_t>({name:"name",description:"description"})
    
    // Function to display all the classes
    const MenuDisplay = () => <div className='d-flex row w-25'>
      {classes.map((name, index) => <button className='btn btn-primary mx-auto my-2' onClick={
        () => { set_ClassSelected(name)}
      }>{name}</button>)}
    </div>
  
    useEffect(() => {
      let temp: string[];
      fetch("https://www.dnd5eapi.co/api/classes")
      .then((data:any) => data.json())
      .then((data:any) => {
        temp = data.results.map((races:any) => races.index)
        set_classes(temp)
      }) 
    }, [])
  
    useEffect(() => {
      fetch(`https://www.dnd5eapi.co/api/classes/${classSelected}`)
      .then((data:any) => data.json())
      .then((data:any) => {
        set_classInfo({name:classSelected,description:`${data.proficiencies?.map((el:any) => `${el.name} `  )}`})
      }) 
    }, [classSelected])
  
    // React Element to display
    return (
      <div className='d-flex'>
        <MenuDisplay/>
        <div className='m-auto w-50'>{classInfo.description}</div>
      </div>
    );
  }