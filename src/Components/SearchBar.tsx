import React from "react";

interface Props {

};

export const SearchBar: React.FC<Props> = () => {
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