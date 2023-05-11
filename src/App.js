import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


const App = () => {
  const [spell, setSpell] = React.useState({});

  React.useEffect( () => {
    (async () => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/spells/acid-arrow");
        if(!response.ok) {
          throw Error(response.status + ": " + response.statusText);
        }
        const result = await response.json();
        setSpell(result);
      } catch (error) {
        console.log('Fetch API Error: ' + error )
      }
    }) ();
  }, []);

  if(spell.index != undefined){
    return (
      <div> {spell.name}</div>
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
