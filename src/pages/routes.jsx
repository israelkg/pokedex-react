
import { Route, Routes } from "react-router-dom"
import PagePokemon from "./PagePokemon.jsx"
import Main from "../components/layout/Main.jsx"
import Section from "../components/layout/Section.jsx"

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/pokemon/:name" element={<PagePokemon />} />
            </Routes>
        
    )
}

export default AppRoutes;