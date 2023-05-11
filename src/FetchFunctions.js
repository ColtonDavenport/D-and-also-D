const SPELLS_URL = "https://www.dnd5eapi.co/api/spells/"

async function fetchDnd (url) {
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw Error(response.status + ": " + response.statusText);
    }
    return await response.json(); 
  } catch (error) {
    console.log('Fetch API Error: ' + error )
  }   
}

export async function fetchSpellDetails (spellIndex) {
  return fetchDnd(SPELLS_URL + spellIndex);
}

export async function fetchSpellList () {
  return fetchDnd(SPELLS_URL);
}