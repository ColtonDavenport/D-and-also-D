import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SpellSelector from './SpellSelector';
import { fetchSpellDetails } from './FetchFunctions';

const DEFAULT_SPELL_INDEX = "acid-arrow";

/*
 * Object Name: loaded Spells
 * Purpose:
 *   This object will act like a dictionary to save information 
 *   about spells as they are loaded. This will help reduce how
 *   many calls to the dndAPI have to be made and in turn speed
 *   up the program.
*/
let loadedSpells = {};


const App = () => {
  const [spell, setSpell] = React.useState({});

  React.useEffect( () => { 
    updateSelectedSpell(DEFAULT_SPELL_INDEX);
  }, []);

  function updateSelectedSpell (spellIndex) {
    (async () => {
      let spellDetails;

      if (loadedSpells[spellIndex] === undefined ) {
        spellDetails = await fetchSpellDetails(spellIndex);
        loadedSpells[spellIndex] = spellDetails;
      }
      else {
        spellDetails = loadedSpells[spellIndex];
      }
      
      setSpell(spellDetails);
    }) ();
  }
  
  function dropdownChange (event) {
    updateSelectedSpell(event.target.value);
  }

  if(spell != undefined){
    return (
      <React.Fragment>

        <SpellSelector onChange={dropdownChange} />
        <div> {spell.name}</div>

      </React.Fragment>
    )
  }
  return (
    <div> Loading . . . </div>
  )

}

export default App;
