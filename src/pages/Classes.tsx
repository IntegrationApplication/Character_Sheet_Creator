import React, { useEffect, useState } from 'react';
import { Class_t } from '../types/Class_t';

export function Class({ set_ClassSelected, set_classes, set_classInfo, classSelected, classInfo, classes }: { classInfo: Class_t, classSelected: string, set_ClassSelected: any, set_classes: any, set_classInfo: any, classes: string[] }) {

  // Function to display all the classes
  const MenuDisplay = () => <div className='d-flex row w-25'>
    {classes.map((name, index) => <button className='btn btn-primary mx-auto my-2' onClick={
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