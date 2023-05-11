import React from 'react';


const SpellSelector = ({onChange, spellList}) => {
    if(spellList === undefined) {
        return (
            <select> 
                <option> loading List </option>
            </select>
        )
    }
    return (
        <select onChange={onChange}> 
            {
                spellList.map(spell => <option key={spell.index} value={spell.index}>{spell.name}</option>)
            }
        </select>
    )
}

export default SpellSelector;