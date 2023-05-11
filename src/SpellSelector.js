import React from 'react';


const SpellSelector = ({onChange, spellList}) => {
    //console.log(spellList);
    if(spellList === undefined) {
        return (
            <select> 
                <option> loading List </option>
            </select>
        )
    }
    console.log("howdy",spellList)
    return (
        <select onChange={onChange}> 
            {
                spellList.map(spell => <option key={spell.index} value={spell.index}>{spell.name}</option>)
            }
        </select>
    )
}

export default SpellSelector;