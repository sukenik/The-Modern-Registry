import React, { useContext, useState } from "react";

interface iFilteringContext {
    statusFilter: string,
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>
};
const FilteringContext = React.createContext<iFilteringContext | null>(null);
export const useFilteringContext = () => useContext(FilteringContext) as iFilteringContext;

export const FilteringProvider: React.FC = ({ children }) => {
    const [statusFilter, setStatusFilter] = useState('default');

    return (
        <FilteringContext.Provider value={{ statusFilter, setStatusFilter }}>
            {children}
        </FilteringContext.Provider>
    );
};