import React, { CSSProperties } from "react";
import { useFilteringContext } from "../Context/FilteringContext";

const SEARCH_BAR_STYLES: CSSProperties = {
    paddingTop: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};
const INPUT_STYLES: CSSProperties = {
    paddingLeft: 5,
    marginBottom: 5,
    fontSize: 15
};

interface iSearchBarProps {
    searchText: string,
    handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const SearchBar: React.FC<iSearchBarProps> = ({ searchText, handleSearchTextChange }) => {
    const { statusFilter, setStatusFilter } = useFilteringContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value);

    return (
        <div style={SEARCH_BAR_STYLES}>
            <input style={INPUT_STYLES} type="text" placeholder="Search..." value={searchText} onChange={handleSearchTextChange} />
            <div>
                <label htmlFor="status">Filter by: </label>
                <select style={{ cursor: 'pointer' }} name="status" onChange={handleChange} value={statusFilter}>
                    <option value="default">No filter</option>
                    <option value="Active">Active</option>
                    <option value="Complete">Complete</option>
                </select>
            </div>
        </div>
    );
};