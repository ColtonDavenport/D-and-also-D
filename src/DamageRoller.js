import React, { useEffect } from 'react';

const SLOT_SELECT_ID = "slotSelect"
const ROLL_RESULTS_ID = "rollResults"
const DAMAGE_PREVIEW_ID = "damagePreview"

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

    } else if (damage.damage_at_character_level !== undefined){
        levelString = "Character Level"
        const numberOfSlots = Object.keys(damage.damage_at_character_level).length;
        for( const [level, damageDice] of Object.entries(damage.damage_at_character_level)){
            levelDamages.push({
                level: level,
                damageDice: damageDice
            });
        }

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

function UpdateDamagePreview(event) {
        const preview = document.getElementById(DAMAGE_PREVIEW_ID);
        preview.innerHTML = event.target.value;
}

const DamageRoller = ({damage}) => {

    useEffect(() => {
        const select = document.getElementById(SLOT_SELECT_ID);
        const results = document.getElementById(ROLL_RESULTS_ID);
        const preview = document.getElementById(DAMAGE_PREVIEW_ID);

        if(select === null)
            return;
        select.selectedIndex = "0";

        results.innerHTML = "";
        console.log(damage);
        
        preview.innerHTML = select.value;
        
        
    });

    if(damage === undefined) return null;

    //create an array for possible damage values, 
    let [levelString, levelDamages] = parseDamageLevels(damage);
    console.log(levelDamages[0])
    return (
        <React.Fragment>
            <label htmlFor={SLOT_SELECT_ID}>{levelString}: </label>
            <select id={SLOT_SELECT_ID} onChange={UpdateDamagePreview}>
                {levelDamages.map(slot => <option key={"lvlDmg"+slot.level} value={slot.damageDice}>{slot.level}</option>)}
            </select>
            <button onClick={RollDamage}> Roll For Damage: </button>
            <div id={DAMAGE_PREVIEW_ID}></div>
            <div id={ROLL_RESULTS_ID}></div>
        </React.Fragment>
    )
}

export default DamageRoller;