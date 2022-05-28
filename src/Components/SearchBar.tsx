import React from "react";

interface iSearchBarProps {
    searchText: string,
    debounceText: string,
    handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar: React.FC<iSearchBarProps> = ({ searchText, debounceText, handleSearchTextChange }) => {
    return (
        <div id="search-bar">
            <p>{debounceText}</p>
            <input type="text" placeholder="Search..." value={searchText} onChange={handleSearchTextChange} />
            <div>
                <label htmlFor="status">Filter by: </label>
                <select name="status" id="StatusFilter">
                    <option value="Active">Active</option>
                    <option value="Complete">Complete</option>
                </select>
            </div>
        </div>
    );
};