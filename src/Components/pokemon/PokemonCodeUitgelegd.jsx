import React, {useEffect, useState} from 'react';
import axios from "axios";

const PokemonCodeUitgelegd = () => {
    // de state die je in App.js hebt gedefinieerd geef je hier mee, zodat je hem kan gebruiken

    useEffect(() => {
        //useEffect zorgt ervoor dat je array niet in een infinite loop komt, waardoor je app stukloopt
        async function fetchPokemon() {
            // met een async function haal je data op, bij een andere endpoint
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                //om de opgehaalde data dynamisch te maken verander je het eindpunt van de url (`https://pokeapi.co/api/v2/pokemon/jigglypuff`) van jigglypuff naar injecteerbare data ${}. De naam stop je in een variabel.
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
            {Object.keys(pokemonData).length > 0 &&
                // {{Object.keys(pokemonData).length>0  && heb je nodig om errors af te vangen. Met Object.keys maak je een array en controleer je of er data object zit, als dat waar is, ga je via && naar de overige code. Dus van het object pokemondata maken we array en daarin check je of de lengte groter dan 0 is, zo ja laat dan de data zien die we hebben.

                //een key gebruik je alleen bij de mapmethode. Daar geef je het element een key, de key organiseert properties voor de browser, zo kan hij de array herkennen en goed uitlezen van 1 tot oneindig.

                // daarna moet je weer een lege fragment plaatsen, omdat de pagina anders niet werkt, gezien je maar 1 element mag returnen, zonder fragment zijn het er vijf.
                <>
                    <h2>{pokemonData.data.name}</h2>
                    {/*     je verwijst nu niet meer naar de variabel 'result' om iets op te halen uit je array (dus niet: result.data.weight) maar naar pokemonData, omdat pokemonData nu je state is (dus wel: pokemonData.data.weight).*/}
                    <img src={pokemonData.data.sprites.front_default}/>
                    <ul>
                        <h3>Abilities: </h3>
                        {pokemonData.data.abilities.map((ableTo) => {
                            return <li key={ableTo.ability.name}> {ableTo.ability.name}</li>
                        })
                        }
                    </ul>
                    <p> Weight: {pokemonData.data.weight}</p>
                    <p> Moves: {pokemonData.data.moves.length}</p>
                    {/*met length geef je aan hoeveel moves er in de array zitten*/}
                </>
            }
        </>
    );


};

export default PokemonCodeUitgelegd;