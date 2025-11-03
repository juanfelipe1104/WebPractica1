import {useRef} from "react";

export default function SearchBar({query, onChange, onSubmit, isLoading}){
    const inputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar que el formulario recargue la página
        onSubmit();
    }
    return (
        <form id="searchBar" onSubmit={handleSubmit}>
            <input
            ref={inputRef}
            type="search"
            placeholder="Busca una serie"
            value={query}
            onChange={(e) => onChange(e.target.value)}>
            </input>
            <button type="submit" disabled={!query || isLoading}>{isLoading ? "Buscando..." : "Buscar"}</button>
        </form>
    )
}