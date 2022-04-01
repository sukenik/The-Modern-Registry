import React from "react";

interface Props {

};

export const CreateMissionForm: React.FC<Props> = () => {
    return (
        <div id="CreateMissionForm">
            <label htmlFor="Name">Name:</label>
            <input type="text" placeholder="Name" />
            <label htmlFor="status">Status:</label>
            <select name="status" id="StatusFilter">
                <option value="Active">Active</option>
                <option value="Complete">Complete</option>
            </select>
            <label htmlFor="Link to mission">Link to mission:</label>
            <input type="text" placeholder="Search..." />
        </div>
    );
};