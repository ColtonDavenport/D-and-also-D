import React from 'react';


const SpellSelector = ({onChange}) => {
    return (
        <select onChange={onChange}> 
            <option value="acid-arrow"> Acid Arrow</option>
            <option value="true-strike"> True Strike</option>
            <option value="magic-missile"> Magic Missile</option>
        </select>
    )
}

export default SpellSelector;