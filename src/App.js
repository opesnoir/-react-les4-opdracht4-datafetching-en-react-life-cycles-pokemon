import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";










function App() {

    const [pokemonData, setPokemonData] = useState({});
    // je krijgt een object terug, dus de initialState is een leeg object {}

    useEffect(() => {
        //useEffect zorgt ervoor dat je array niet in een infinite loop komt, waardoor je app stukloopt
        async function fetchPokemon() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/jigglypuff`)
                console.log(result);
                setPokemonData(result);
                //  Block of code to try

            } catch (e) {
                console.error(e)
                //  Block of code to handle errors
            }
        }
        fetchPokemon();
        // Met fetchPokemon haal je de functie op, zodat hij actief wordt en je ermee kan werken
    }, []);
// De dependency array is leeg deps [], zo wordt hij maar een keer geladen op het moment dat je de pagina opent ipv dat hij op een infinite loop draait


    return (
        <>
            {Object.keys(pokemonData).length > 0  &&
                // {{Object.keys(pokemonData).length>0  && heb je nodig om errors af te vangen. Met Object.keys maak je een array en controleer je of er data object zit, als dat waar is, ga je via && naar de overige code. Dus van het object pokemondata maken we array en daarin check je of de lengte groter dan 0 is, zo ja laat dan de data zien die we hebben.

                // daarna moet je weer een lege fragment plaatsen, omdat de pagina anders niet werkt, gezien je maar 1 element mag returnen, zonder fragment zijn het er vijf.
                <>
                <h2>{pokemonData.data.name}</h2>
            {/*     je verwijst nu niet meer naar de variabel 'result' om iets op te halen uit je array (dus niet: result.data.weight) maar naar pokemonData, omdat pokemonData nu je state is (dus wel: pokemonData.data.weight).*/}
                    <img src={pokemonData.data.sprites.front_default}/>
                    <ul>
                        {pokemonData.data.abilities.map((a)=>{
                            return <li key={a.ability.name}>{a.ability.name}</li>
                        })
                        }
                        <li>eerste ability</li>
                        <li>tweede ability</li>
                        <li>derde ability</li>
                    </ul>
                    <p>{pokemonData.data.weight}</p>
                    <p>hoeveelheid moves</p>
                </>
            }
        </>
    );
}

export default App;
