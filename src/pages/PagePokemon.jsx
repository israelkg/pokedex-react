
import axios from "axios";
import BackHome from "../components/buttons/BackHome.jsx";
import { typeEmojis } from "../utils/typeEmojis.jsx";
import { typeColors } from "../utils/typeColors.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { useFetchPokemons } from "../../hooks/useFetchPokemons";

const PagePokemon = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const details = response.data;           // array com nome e url

                const abilitiesData = await Promise.all(
                    details.abilities.map(async (a) => {
                        const res = await axios.get(a.ability.url);
                        const entry = res.data.effect_entries.find(e => e.language.name === "en");
                        return {
                            name: a.ability.name,
                            description: entry ? entry.effect : "No description found."
                        };
                    })
                );

                setPokemon({
                    name: details.name,
                    image: details.sprites.front_default,
                    types: details.types ? details.types.map(t => t.type.name) : [],
                    moves: details.moves ? details.moves.map(a => a.move.name) : [],
                    height: details.height,
                    weight: details.weight,
                    abilities: abilitiesData,
                    id: details.id
                })
            } catch (error) {
                console.error("Erro ao carregar os pokemons ", error);
            } finally {
                setLoading(false);       // finaliza o carregamento
            }
        }
        fetchPokemon();
    }, [name]);

    if (loading) return (
        <section className="flex justify-center items-center w-full h-full bg-[#acaaaa]">
            <p className="flex justify-center items-center text-white p-4 ">Carregando...</p>
        </section>
    )
    // if (!pokemon) return <p className="text-white p-4">Pokemon não encontrado...</p>

    return (
        <section className=" flex justify-center items-center flex-col min-h-screen bg-[#e9e8e8]">
            <div className="border border-b-fuchsia-50 bg-[#EF5350] mt-15 rounded-4xl w-75 sm:w-130 lg:w-200">
                <h1 className="text-white p-5 capitalize font-bold text-3xl flex justify-center mb-4 mt-3 sm:mb-0">{pokemon.name} #{pokemon.id}</h1>

                {/* <div className="rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-5xl w-full"> */}
                <div>
                    <div className="flex justify-center">
                        <div className="">
                            <img src={pokemon.image} alt="" className="w-70 h-70 object-contain" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {pokemon.types?.map((type, index) => (
                            <div
                                key={index}
                                className={`w-18 h-18 mx-2 flex items-center justify-center rounded-full sm: ${typeColors[type.toLowerCase()] || "bg-gray-200"}`}>
                                <img
                                    key={index} alt={type}
                                    src={typeEmojis[type.toLowerCase()] || ""}
                                    className="w-18 h-18"
                                />
                            </div>
                        ))}
                    </div>

                    <div className=" flex justify-center gap-10 mt-10">
                        <p className="text-lg"><strong>Weight: </strong> {pokemon.weight}</p>
                        <p className="text-lg"><strong>Height: </strong> {pokemon.height}</p>
                    </div>
                </div>

                <div className="rounded-2xl p-5 grid md:grid-cols-2 gap-4 items-center max-w-5xl w-full lg:p-10">
                    {/* Coluna 1 */}
                    <div className="h-full bg-[#e9c433] p-5 rounded-lg transition-all duration-300 hover:bg-yellow-300">
                        <p className="text-lg flex justify-center text-[#383838]"><strong>Habilidades</strong></p>
                        <ul className="mt-4 lg:space-y-2">
                            {pokemon.abilities.map((ability, index) => (
                                <li className="mx-1 lg:mx-4" key={index}>
                                    <p className="mt-5 text-lg font-bold capitalize text-[#2b2929]">{ability.name}</p>
                                    <p className="text font-normal text-[#000000]">{ability.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 2 */}
                    <div className="h-full p-5 bg-[#e9c433] rounded-lg transition-all duration-300 hover:bg-yellow-300">
                        <p className="text-lg flex justify-center text-[#383838]"><strong>Golpes</strong></p>
                        <div className="mt-4 h-50 p-2 bg-[#d8c783] rounded-2xl overflow-y-scroll scrollbar-custom lg:m-4 lg:p-3 lg:space-y-2">
                            {pokemon.moves.map((move, index) => (
                                <p key={index} className="text-lg text-[#000000] rounded-lg p-3 transition-all duration-300 hover:bg-red-400">
                                    {move}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <BackHome />
            </div>
        </section>
    )
}

export default PagePokemon