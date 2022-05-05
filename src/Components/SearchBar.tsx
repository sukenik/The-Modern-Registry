import React from "react";

export const SearchBar: React.FC = () => {
    return (
        <div id="SearchBar">
            <input type="text" placeholder="Search..." />
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