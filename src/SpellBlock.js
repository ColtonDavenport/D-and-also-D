import React from 'react';
import DamageRoller from './DamageRoller';
import {HigherLevel, SpellLevel} from './Levels';


const SpellBlock = ({details}) => {
    if(details.desc === undefined) {
        return (
            <div>
                <h4>No spell selected</h4>
            </div>
        )
    }
    return (
        <div>
            <h4>{details.name}</h4>                
            <SpellLevel level={details.level}/>
            {details.desc.map((paragraph,index) => <p key={"desc"+index}>{paragraph}</p>)}
            <HigherLevel higher_level={details.higher_level} />
            <DamageRoller damage={details.damage} />
        </div>
    )
}

export default SpellBlock;