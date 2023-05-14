import React from 'react';

const SLOT_SELECT_ID = "slotSelect"
const ROLL_RESULTS_ID = "rollResults"
class DamageDice {
    constructor(numberOfDice, diceType){
        this.numberOfDice = parseInt(numberOfDice);
        this.diceType = parseInt(diceType);
    }
    
    Roll() {
        let results = "";
        let total = 0;
        for(let i = 0; i < this.numberOfDice; i++){
            total += Math.floor(1 + Math.random() * this.diceType);
        }
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
            // let diceArray = damage.damage_at_slot_level[level].split('d');
            // let damageDice = new DamageDice(diceArray[0],diceArray[1]);
            levelDamages.push({
                level: level,
                damageDice: damage.damage_at_slot_level[level]
            })
        }

    } else {
        levelString = "Character Level"
    }

    return [levelString, levelDamages];
}


function RollDamage () {
    let damageString = document.getElementById(SLOT_SELECT_ID).value;
    let [numDice, diceType] = damageString.split('d').map(e => parseInt(e)); // parse a string like "4d6"
    
    let results = damageString + " = ";
    let total = 0;
    for(let i = 0; i < numDice; i++){
        let roll = Math.floor(1 + Math.random() * diceType);
        total += roll;
        results += roll + " ";
        if(i != numDice -1)
            results += "+ "
    }
    results += "= " + total;

    let resultsDiv = document.getElementById(ROLL_RESULTS_ID);
    resultsDiv.innerHTML = results;    
}

const DamageRoller = ({damage}) => {
    if(damage === undefined) return null;

    //create an array for possible damage values, 
    let [levelString, levelDamages] = parseDamageLevels(damage);
    console.log(levelDamages[0])
    return (
        <React.Fragment>
            <label htmlFor={SLOT_SELECT_ID}>{levelString}: </label>
            <select id={SLOT_SELECT_ID}>
                {levelDamages.map(slot => <option key={"lvlDmg"+slot.level} value={slot.damageDice}>{slot.level}</option>)}
            </select>
            <button onClick={RollDamage}> Roll For Damage</button>
            <div id={ROLL_RESULTS_ID}></div>
        </React.Fragment>
    )
}

export default DamageRoller;