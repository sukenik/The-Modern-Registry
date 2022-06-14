import React, { useContext, useState } from "react";
import { useDebounce } from "../Hooks/useDebounce";

interface iFilteringContext {
    debounceText: string,
    searchText: string,
    handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    statusFilter: string,
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>,
    handleFilterStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FilteringContext = React.createContext<iFilteringContext | string>('')
export const useFilteringContext = () => useContext(FilteringContext) as iFilteringContext

export const FilteringProvider: React.FC = ({ children }) => {
    const [debounceText, searchText, setSearchText] = useDebounce('', 500)
    const [statusFilter, setStatusFilter] = useState('default')
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)
    const handleFilterStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)

    return (
        <FilteringContext.Provider 
            value={{ debounceText, searchText, handleSearchTextChange, statusFilter, setStatusFilter, handleFilterStatusChange }}
        >
            {children}
        </FilteringContext.Provider>
    );
}