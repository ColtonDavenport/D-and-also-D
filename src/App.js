import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SpellSelector from './SpellSelector';
import { fetchSpellDetails } from './FetchFunctions';


const App = () => {
  const [spell, setSpell] = React.useState({});

  React.useEffect( () => { 
    updateSelectedSpell("acid-arrow");
  }, []);

  function updateSelectedSpell (spellIndex) {
    (async () => {
      let spellDetails = await fetchSpellDetails(spellIndex);
      setSpell(spellDetails);
    }) ();
  }
  function dropdownChange (event) {
    updateSelectedSpell(event.target.value);
  }

  if(spell != undefined){
    return (
      <React.Fragment>

        <SpellSelector onChange={dropdownChange} />
        <div> {spell.name}</div>

      </React.Fragment>
    )
  }
  return (
    <div> Loading . . . </div>
  )

}


// class App extends Component {

//   constructor(props){
//     super(props);

//     this.state = {
//       spell: {},
//       isLoaded: false
//     };
//   }

//   componentDidMount() {
//     fetch('https://www.dnd5eapi.co/api/spells/acid-arrow')
//       .then(res => res.json())
//       .then(json => {
//         this.setState = {
//           isLoaded: true,
//           spell: json
//         }
//         console.log(this.state.isLoaded);
//       });
//   }

//   render() {

//     let {isLoaded, spell} = this.state;
//     if (!isLoaded) return (
//       <div className="App">
//         waiting to load
//       </div>
//     )

//     return (
//       <div className="App">
//         loaded
//       </div>
//     )
//   }
// }

export default App;
