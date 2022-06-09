import React, { useContext } from "react";
import { useDebounce } from "../Hooks/useDebounce";

interface iFilteringContext {
    debounceText: string,
    searchText: string,
    handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilteringContext = React.createContext<iFilteringContext | string>('')
export const useFilteringContext = () => useContext(FilteringContext) as iFilteringContext

export const FilteringProvider: React.FC = ({ children }) => {
    const [debounceText, searchText, setSearchText] = useDebounce('', 500)
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)

    return (
        <FilteringContext.Provider value={{ debounceText, searchText, handleSearchTextChange }}>
            {children}
        </FilteringContext.Provider>
    );
}