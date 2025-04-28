
import { useNavigate } from "react-router-dom";

const BackHome = () => {
    const navigate = useNavigate();

    return(
        <button
                onClick={() => navigate("/")}
                className="p-5 mt-10 mb-10 w-50 bg-[#FFCB05] border-blue-400 border-2 text-1xl font-bold text-black rounded-3xl hover:bg-yellow-500 transform transition-all duration-400 hover:scale-110"
            >
                Voltar para lista
        </button>
    )
}

export default BackHome;