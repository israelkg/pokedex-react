
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";

const Header = () => {
    const navigate = useNavigate();

    return (
        // dark: #424242
        // light: #acaaaa
        // bg-[#EF5350]
        <header className="flex justify-around items-center bg-[#e9e8e8] w-full p-3 border-b-2 border-[#3D7DCA] sm:p-4 lg:p-3 xl:p-4 2xl:p-4 ">
            <button  onClick={() => navigate("/")}><img className="h-15 sm:h-20 lg:h-15 xl:h-20 2xl:h-23" src={logo} alt="Logo da Pokedex" /></button>
        </header>
    )
}

export default Header