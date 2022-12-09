import React, {useEffect, useState} from 'react';
import axios from "axios";

function Pokemon({name}) {
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {

        async function fetchPokemon() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                console.log(result);
                setPokemonData(result);
            } catch (e) {
                console.error(e)
            }
        }

        fetchPokemon();
    }, []);


    return (
        <>
            {Object.keys(pokemonData).length > 0 &&
                <>
                    <h2>{pokemonData.data.name}</h2>
                    <img src={pokemonData.data.sprites.front_default}/>
                    <ul>
                        <h3>Abilities: </h3>
                        {pokemonData.data.abilities.map((ableTo) => {
                            return <li key={ableTo.ability.name}> {ableTo.ability.name}</li>
                        })}
                    </ul>
                    <p> Weight: {pokemonData.data.weight}</p>
                    <p> Moves: {pokemonData.data.moves.length}</p>
                </>
            }
        </>
    );
}

export default Pokemon;