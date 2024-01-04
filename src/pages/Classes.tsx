import React from 'react';
import { Class_t } from '../types/Class_t';

interface ClassType {
    classInfo: Class_t;
    set_ClassSelected: (value: string) => void;
    classes: string[];
}
export function Class({ set_ClassSelected, classInfo, classes }: ClassType) {

  // Function to display all the classes
  const MenuDisplay = () => <div className='d-flex row w-25'>
    {classes.map((name, index) => <button className='btn btn-primary mx-auto my-2' id={`classBnt${index}`} onClick={
      () => { set_ClassSelected(name) }
    }>{name}</button>)}
  </div>

  // React Element to display
  return (
    <div className='d-flex'>
      <MenuDisplay />
      <div className='m-auto w-50'>{classInfo.description}</div>
    </div>
  );
}
