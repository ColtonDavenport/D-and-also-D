import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SpellSelector from './SpellSelector';
import { fetchSpellDetails, fetchSpellList } from './FetchFunctions';
import SpellBlock from './SpellBlock';

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
  const [spellList, setSpellList] = React.useState([]);


  React.useEffect( () => {
    updateSpellList();
    updateSelectedSpell(DEFAULT_SPELL_INDEX);
  }, []);

  async function updateSpellList() {
    let newSpellList = await fetchSpellList();
    setSpellList(newSpellList.results);
  }

  async function updateSelectedSpell (spellIndex) {
      let spellDetails;

      if (loadedSpells[spellIndex] === undefined ) {
        spellDetails = await fetchSpellDetails(spellIndex);
        loadedSpells[spellIndex] = spellDetails;
      }
      else {
        spellDetails = loadedSpells[spellIndex];
      }
      
      setSpell(spellDetails);
  }

  function dropdownChange (event) {
    updateSelectedSpell(event.target.value);
  }

  if(spell != undefined){
    return (
      <React.Fragment>

        <SpellSelector onChange={dropdownChange} spellList={spellList}/>
        <SpellBlock details={spell} />

      </React.Fragment>
    )
  }
  return (
    <div> Loading . . . </div>
  )

}

export default App;
