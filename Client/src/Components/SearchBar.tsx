import React, { CSSProperties } from "react";
import { useStylesContext } from "../Context/StylesContext";
import { useFilteringContext } from "../Context/FilteringContext";

const SEARCH_BAR_STYLES: CSSProperties = {
    padding: '10px 0 5px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
}
const INPUT_STYLES: CSSProperties = {
    paddingLeft: 5,
    marginBottom: 5,
    fontSize: 15
}
const INPUT_DARK_STYLES: CSSProperties = {
    ...INPUT_STYLES,
    backgroundColor: '#121212',
    border: '1px solid rgb(120, 120, 120)',
    color: 'white'
}
const SELECT_STYLES: CSSProperties = {
    cursor: 'pointer'
}
const SELECT_DARK_STYLES: CSSProperties = {
    ...SELECT_STYLES,
    backgroundColor: '#121212',
    color: 'rgb(120, 120, 120)'
}
const LABEL_STYLES: CSSProperties = {}
const LABEL_DARK_STYLES: CSSProperties = {
    ...LABEL_STYLES,
    color: 'rgb(120, 120, 120)'
}

export const SearchBar: React.FC = () => {
    const { searchText, handleSearchTextChange, statusFilter, handleFilterStatusChange } = useFilteringContext()
    const { darkTheme } = useStylesContext()

    return (
        <div style={SEARCH_BAR_STYLES}>
            <input 
                style={darkTheme ? INPUT_DARK_STYLES:  INPUT_STYLES} 
                type="text" 
                placeholder="Search..." 
                value={searchText} 
                onChange={handleSearchTextChange} 
            />
            <div>
                <label style={darkTheme ? LABEL_DARK_STYLES : LABEL_STYLES} htmlFor="status">Filter by: </label>
                <select 
                    style={darkTheme ? SELECT_DARK_STYLES : SELECT_STYLES} 
                    name="status-filter" 
                    value={statusFilter} 
                    onChange={handleFilterStatusChange}
                >
                    <option value="default">No filter</option>
                    <option value="Active">Active</option>
                    <option value="Complete">Complete</option>
                </select>
            </div>
        </div>
    );
};