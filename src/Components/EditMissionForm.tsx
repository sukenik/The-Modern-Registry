import React, { useState } from "react";
import { missions } from "../data";
import { filterParentSubMissionsFromLink, getLinkToMissionOptions, getMissionsExceptLowestHierarchy } from "../Logic/SubMissionLogic";

// interface Props {
//     id: number,
//     description: string,
//     status: 'Active' | 'Complete',
//     parentID: number | null
// }

export const EditMissionForm: React.FC = () => {
    const [selectValue, setSelectValue] = useState('default');
    const [nameValue, setNameValue] = useState('');
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    };
    const missionsFitToLink = getMissionsExceptLowestHierarchy();

    // TODO: manage global state to pass prop with current mission details
    /* 
        # Step 1: Mission can't link to itself
        getLinkToMissionOptions(id);
    
        # Step 2: Mission can't link to its children
        filterParentSubMissionsFromLink(missions, 2);

        # Step 3: Mission can't link to missions in the 3rd hierarchy (sub-sub missions)
        
    */

    const missionsFitToLinkOptionElements = missionsFitToLink.map(
        mission => <option key={mission.id} value={mission.description}>{mission.description}</option>
    );
    

    return (
        <div id="MissionForm">
            <label htmlFor="Name">Name:</label>
            <input type="text" placeholder="Name" value={nameValue} onChange={handleNameChange} maxLength={50} />
            <label htmlFor="status">Status:</label>
            <select name="status" id="StatusFilter">
                <option value="Active">Active</option>
                <option value="Complete">Complete</option>
            </select>
            <label htmlFor="Link to mission">Link to mission:</label>
            <select name="link-to-mission" defaultValue={selectValue} onChange={handleSelectChange}>
                <option value="default" disabled hidden>
                    Choose a mission...
                </option>
                {missionsFitToLinkOptionElements}
            </select>
        </div>
    );
};