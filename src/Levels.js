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

export const SpellLevel = ({level}) => {
    level = parseInt(level);

    if(level === 0) return (<h5>Cantrip</h5>)

    return (
        <h5>{level}<sup>{ordinal_suffix_of(parseInt(level))}</sup> Level Spell</h5>
    )
}

export const HigherLevel = ({higher_level}) => {
    if (higher_level.length === 0) return null;

    return(
        <React.Fragment>
            {higher_level.map((paragraph, index) => <p key={"hl"+index}> {paragraph}</p>)}
        </React.Fragment>
    )
}

export default HigherLevel;