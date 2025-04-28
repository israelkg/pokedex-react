
import { Link } from "react-router-dom";
import { typeEmojis } from "../../utils/typeEmojis";
import { typeColors } from "../../utils/typeColors";

const PokemonCard = ({ pokemon }) => {
    // console.log("Pokemons recebidos: ", pokemon); 

    return (
        <div>
            <Link
                to={`/pokemon/${pokemon.name}`}
                className="p-6 m-4 bg-[#ccc9c9] border-[#ee0000] border-1 rounded-lg text-center flex flex-col transform transition-all duration-500 hover:scale-110 hover:shadow-lg sm:p-7 sm:m-4 lg:p-4 lg:m-3 xl:m-3 xl:p-4 2xl:p-6 2xl:m-4">
                <h2 className="text-[#1b1b1b] text-2xl text-center flex justify-center capitalize font-semibold sm:text-3xl lg:text-base xl:text-xl 2xl:text-xl">{pokemon.name}</h2>
                <img className="w-full" src={pokemon.image} alt="{pokemon.name}" />

                <div className="flex justify-center mt-2">
                    {pokemon.types?.map((type, index) => (
                        <div
                            key={index}     
                                
                            className={`w-10 h-10 m-2 flex items-center justify-center rounded-full ${typeColors[type.toLowerCase()] || "bg-gray-200"}`}>
                            <img
                                key={index} alt={type}
                                src={typeEmojis[type.toLowerCase()] || ""}
                                className="w-8 h-8"
                            />
                        </div>
                    ))}
                </div>
            </Link>
        </div>

    );
}

export default PokemonCard