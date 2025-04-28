import React, { useState, useEffect } from 'react'       // hooks
import axios from "axios";                        // para fazer chamadas HTTPS

export const useFetchPokemons = () => {
    const [ pokemons, setPokemons ] = useState([])        // armazena os dados dos pokemo
    const [ loading, setLoading ] = useState(true);       // indica se está carregado os dados
    const [ offSet, setOffSet ] = useState(0);            // controle de "pagina"

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true)

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offSet}`);
                const pokemonList = response.data.results;           // array com nome e url

                const detailedPokemons = await Promise.all(
                    pokemonList.map(async (pokemon) => {
                        const deatilsResponse = await axios.get(pokemon.url);
                        const details = deatilsResponse.data;
                        
                        return {   //retornando tudo certo, name, img, type, ability
                            name: details.name,
                            image: details.sprites.front_default,
                            types: details.types ? details.types.map(t => t.type.name) : [],
                            abilities: details.abilities ? details.abilities.map(a => a.ability.name) : [],
                            moves: details.moves ? details.moves.map(a => a.move.name) : [],
                            order: details.order,
                        }
                    })
                )

                setPokemons((prevPokemons) => {
                    const mergedPokemons = [...(prevPokemons || []), ...detailedPokemons];    // une pokemons novos e antigos  
                    const uniquePokemons = mergedPokemons.filter(                        // remove pokemons duplicados
                        (pokemon, index, self) =>
                          index === self.findIndex((p) => p.name === pokemon.name)
                    ); 

                    return uniquePokemons
                })
            } catch (error) {
                console.error("Erro ao carregar os pokemons ", error);
            } finally {
                setLoading(false);       // finaliza o carregamento
            }
        }    
        fetchData(offSet);
    }, [offSet]);           //offset       dependencia no []
    
    const loadMore = () => setOffSet((prev) => prev + 10);

    // console.log("Detalhes:", pokemons)
    return { pokemons, loading, loadMore }        //limit
};
export default useFetchPokemons


                        