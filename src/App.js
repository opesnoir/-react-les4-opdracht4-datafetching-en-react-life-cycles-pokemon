import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./Components/pokemon/Pokemon";
import axios from "axios";


function App() {

    const [pokemonArray, setPokemonArray] = useState([])

    async function fetchAllPokemon() {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
            console.log(result);
            //dit is de plek waar data inkomt, dus hier plaats je de setter
            setPokemonArray(result.data.results)

        } catch (e) {
            console.error(e)
        }
    }

    fetchAllPokemon();


    return (
        <>
           <ul>
               {pokemonArray.map((pokemon)=>{
                   return <Pokemon name={pokemon.name}/>
                   // je returnt hier het component dat je voor 1 hebt gemaakt, maar je mapt nu door je pokemonArray voor data.
               })}
           </ul>
        </>
    );
}

export default App;
