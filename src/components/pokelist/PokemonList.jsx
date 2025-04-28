
import PokemonCard from "../cards/PokemonCard";

const PokemonList = ({ pokemons }) => {

    return (
        <div className="flex flex-col items-center w-55 sm:w-80 lg:w-180 xl:w-210 2xl:w-250">
            <div className="grid grid-cols-1 rounded-lg sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
                {pokemons?.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon}/>
 
                ))} 
            </div>
        </div>
    )
}

export default PokemonList