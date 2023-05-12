import React from 'react';

// copied from here: https://stackoverflow.com/questions/13627308
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

class DamageRoll {
    constructor(numberOfDice, diceType){
        this.numberOfDice = numberOfDice;
        this.diceType = diceType;
    }
}

const SpellLevel = ({level}) => {
    level = parseInt(level);

    if(level === 0) return (<h5>Cantrip</h5>)

    return (
        <h5>{level}<sup>{ordinal_suffix_of(parseInt(level))}</sup> Level Spell</h5>
    )
}

const HigherLevel = ({higher_level}) => {
    if (higher_level.length === 0) return null;

    return(
        <React.Fragment>
            {higher_level.map((paragraph, index) => <p key={"hl"+index}> {paragraph}</p>)}
        </React.Fragment>
    )
}

function parseDamageLevels (damage) {
    let levelString = "";
    let levelDamages = [];
    if(damage.damage_at_slot_level !== undefined){
        levelString = "Slot level"

        // create an array of objects that will hold each slot level option
        // assumptions: 1) max level of nine 2) Each level between lowest and 9 has a value

        const numberOfSlots = Object.keys(damage.damage_at_slot_level).length;
        const firstKey = 10 - numberOfSlots; // assuming max of nine slots with each 

        for(let i = firstKey; i <= 9; i++){
            let level = i.toString();
            let damageAmount = damage.damage_at_slot_level[level];
            levelDamages.push({
                level: level,
                damage: damageAmount
            })
        }

    } else {
        levelString = "Character Level"
    }

    return [levelString, levelDamages];
}
const DamageRoller = ({damage}) => {
    if(damage === undefined) return null;

    //create an array for possible damage values, 
    let [levelString, levelDamages] = parseDamageLevels(damage)
    return (
        <React.Fragment>
            <label htmlFor="slotSelect">{levelString}: </label>
            <select id="slotSelect">
                {levelDamages.map(slot => <option key={"lvlDmg"+slot.level} value={slot.damage}>{slot.level}</option>)}
            </select>
        </React.Fragment>

    )
}

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