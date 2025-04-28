
import { useFetchPokemons } from "../../hooks/useFetchPokemons.jsx";
import PokemonList from "../pokelist/PokemonList.jsx"
import LoadMorePoke from "../buttons/LoadMorePoke.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Section = () => {
    const { pokemons, loadMore } = useFetchPokemons();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    const [searchResult, setSearchResult] = useState(null);
    const [typeFilteredPokemons, setTypeFilteredPokemons] = useState([]);
    const [error, setError] = useState(null);
    const [loadingType, setLoadingType] = useState(false);
    const [typeOffset, setTypeOffset] = useState(20);

    const loadMoreByType = async () => {
        setLoadingType(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
            const pokemonList = response.data.pokemon.slice(typeOffset, typeOffset + 20); // pega os próximos 20
    
            const promises = pokemonList.map(p =>
                axios.get(p.pokemon.url).then(res => ({
                    name: res.data.name,
                    image: res.data.sprites.front_default,
                    types: res.data.types.map(t => t.type.name),
                    abilities: res.data.abilities.map(a => a.ability.name),
                    moves: res.data.moves.map(a => a.move.name),
                    id: res.data.id,
                }))
            );
    
            const morePokemons = await Promise.all(promises);
            setTypeFilteredPokemons(prev => [...prev, ...morePokemons]); // concatena com os que já estavam
            setTypeOffset(prev => prev + 20); // incrementa o offset
        } catch (err) {
            setError("Erro ao carregar mais pokémons do tipo");
        } finally {
            setLoadingType(false);
        }
    };
    // Busca por nome
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResult(null);
            return;
        }

        const fetchByName = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
                const data = response.data;

                setSearchResult({
                    name: data.name,
                    image: data.sprites.front_default,
                    types: data.types.map(t => t.type.name),
                    abilities: data.abilities.map(a => a.ability.name),
                    moves: data.moves.map(a => a.move.name),
                    id: data.id,
                });

                setError(null);
            } catch (err) {
                setSearchResult(null);
                setError("Pokemon nao encontrado");
            }
        };

        fetchByName();
    }, [searchTerm]);

    // Filtro por tipo
    useEffect(() => {
        const fetchByType = async () => {
            if (selectedType === "all") {
                setTypeFilteredPokemons([]);
                return;
            }

            setLoadingType(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
                const pokemonList = response.data.pokemon.slice(0, 20); // pega só os primeiros 20

                const promises = pokemonList.map(p =>
                    axios.get(p.pokemon.url).then(res => ({
                        name: res.data.name,
                        image: res.data.sprites.front_default,
                        types: res.data.types.map(t => t.type.name),
                        abilities: res.data.abilities.map(a => a.ability.name),
                        moves: res.data.moves.map(a => a.move.name),
                        id: res.data.id,
                    }))
                );

                const detailedPokemons = await Promise.all(promises);
                setTypeFilteredPokemons(detailedPokemons);
            } catch (err) {
                setError("Erro ao carregar pokémons por tipo");
                setTypeFilteredPokemons([]);
            } finally {
                setLoadingType(false);
            }
        };

        setTypeOffset(20);
        fetchByType();
    }, [selectedType]);

    // Decide o que mostrar
    let displayedPokemons = [];

    if (searchTerm.trim() && selectedType === "all") {
        // Busca global por nome (quando tipo for "all")
        displayedPokemons = searchResult ? [searchResult] : [];
    } else if (selectedType !== "all") {
        // Filtro por tipo com ou sem busca por nome
        displayedPokemons = typeFilteredPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        // Lista geral (sem filtro por nome ou tipo)
        displayedPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <section className="flex items-center flex-col bg-[#e9e8e8] ">
            {/* <h1 className="text-4xl text-black font-bold text-center mt-10">Escolha seu Pokémon</h1> */}
            <div className="flex m-6 p-2 rounded-3xl font-bold bg-[#FFCB05] border-2 border-blue-500 text-sm sm:p-3 lg:p-1 lg:m-6 xl:p-2 xl:m-8 2xl:p-3">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar por nome"
                    type="text"
                    className="rounded ml-3 text-black text-xs focus:outline-none focus:border-none lg:p-2 sm:text-sm xl:text-base"
                />

                <select
                    onChange={e => setSelectedType(e.target.value)}
                    className="bg-blue-500 blue-2 text-white px-1 py-1 ml-2 rounded-2xl font-semibold lg:px-2 lg:py-1 2xl:px-3 2xl:py-2"
                    value={selectedType}
                >
                    <option value="all">All Types</option>
                    <option value="bug">Bug</option>
                    <option value="dark">Dark</option>
                    <option value="dragon">Dragon</option>
                    <option value="electric">Electric</option>
                    <option value="fairy">Fairy</option>
                    <option value="fighting">Fighting</option>
                    <option value="fire">Fire</option>
                    <option value="flying">Flying</option>
                    <option value="ghost">Ghost</option>
                    <option value="grass">Grass</option>
                    <option value="ground">Ground</option>
                    <option value="ice">Ice</option>
                    <option value="normal">Normal</option>
                    <option value="poison">Poison</option>
                    <option value="psychic">Psychic</option>
                    <option value="rock">Rock</option>
                    <option value="steel">Steel</option>
                    <option value="water">Water</option>
                </select>
            </div>

            {loadingType && <p className="text-white">Carregando pokémons do tipo {selectedType}...</p>}
            {error && <p className="text-white">{error}</p>}    

            <div className="flex justify-center flex-col bg-[#d68080] p-5 rounded-4xl sm:p-4 lg:p-4 xl:p-5 2xl:p-6">
                <PokemonList pokemons={displayedPokemons} />
            </div>

            {!searchResult && (
                <LoadMorePoke onClick={selectedType === "all" ? loadMore : loadMoreByType}/>
            )}
        </section>
    );
};

export default Section;
