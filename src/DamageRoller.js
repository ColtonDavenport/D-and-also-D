import React from 'react';


class DamageRoll {
    constructor(numberOfDice, diceType){
        this.numberOfDice = numberOfDice;
        this.diceType = diceType;
    }
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

export default DamageRoller;