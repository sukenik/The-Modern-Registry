import React, { useState } from "react";
import { filterLinkToMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { Mission } from "../Custom-Typings/Mission";

interface Props {
    mission: Mission
}

export const MissionForm: React.FC<Props> = ({ mission }) => {
    const [selectValue, setSelectValue] = useState('default');
    const [nameValue, setNameValue] = useState(mission.description);
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    };
    const linkToMissionOptions = filterLinkToMissionOptions(mission.id);

    // TODO: manage global state to pass prop with current mission details
    const missionsFitToLinkOptionElements = linkToMissionOptions.map(
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