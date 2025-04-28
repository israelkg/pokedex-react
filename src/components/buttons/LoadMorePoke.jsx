
const LoadMorePoke = ({ onClick }) => {
    return (
        <div className="mt-6 flex justify-center w-full">
            <button
                onClick={onClick}
                className="p-4 mb-10 w-60 h-18 bg-[#FFCB05] font-bold text-black rounded-3xl border-blue-400 border-2 hover:bg-yellow-500 transform transition-all duration-400 hover:scale-110"
            >
                Carregar mais pokemons
            </button>
        </div>
    );
};

export default LoadMorePoke;