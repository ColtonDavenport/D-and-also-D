const SPELLS_URL = "https://www.dnd5eapi.co/api/spells/"

export async function fetchSpellDetails (spellIndex) {
  try {
    const response = await fetch("https://www.dnd5eapi.co/api/spells/" + spellIndex);
    if(!response.ok) {
      throw Error(response.status + ": " + response.statusText);
    }
    return await response.json(); 
  } catch (error) {
    console.log('Fetch API Error: ' + error )
  }   
}

export async function fetchSpellList () {
  try {
    const response = await fetch("https://www.dnd5eapi.co/api/spells/");
    if(!response.ok) {
      throw Error(response.status + ": " + response.statusText);
    }
    return await response.json(); 
  } catch (error) {
    console.log('Fetch API Error: ' + error )
  }   
}