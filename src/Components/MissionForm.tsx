import React, { useState } from "react";
import { filterLinkToMissionOptions, filterLinkToNewMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { Mission } from "../Custom-Typings/Mission";

interface Props {
    mission: Mission
}

export const MissionForm: React.FC<Props> = ({ mission }) => {
    const modalType = mission.id === 0 ? 'Create' : 'Edit';

    const [LinkToMissionValue, setLinkToMissionValue] = useState('default');
    const [nameValue, setNameValue] = useState(mission.description);
    const [statusValue, setStatusValue] = useState(modalType === 'Create' ? 'default' : mission.status);
    const handleLinkToMissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLinkToMissionValue(e.target.value);
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameValue(e.target.value);
    const handleStatusChange = () => setStatusValue(prevState => prevState === 'Active' ? 'Complete' : 'Active');

    const linkToMissionOptions = modalType === 'Create' ? 
        filterLinkToNewMissionOptions() :
        filterLinkToMissionOptions(mission.id);
        
    const missionsFitToLinkOptionElements = linkToMissionOptions.map(
        mission => <option key={mission.id} value={mission.description}>{mission.description}</option>
    );

    const statusElements = modalType === 'Create' ? 
        ['Active', 'Complete'].map(status => <option key={status} value={status}>{status}</option>) : 
        ['Active', 'Complete'].map(status => 
            <option key={status} value={status} hidden={statusValue === status ? true : false}>{status}</option>)

    return (
        <div id="MissionForm">
            <label htmlFor="Name">Name:</label>
            <input type="text" placeholder="Name" value={nameValue} onChange={handleNameChange} maxLength={50} />
            <label htmlFor="status">Status:</label>
            <select name="status" id="StatusFilter" defaultValue={statusValue} onChange={handleStatusChange}>
                <option value="default" disabled hidden>
                    Choose a status...
                </option>
                {statusElements}
            </select>
            <label htmlFor="Link to mission">Link to mission:</label>
            <select name="link-to-mission" defaultValue={LinkToMissionValue} onChange={handleLinkToMissionChange}>
                <option value="default" disabled hidden>
                    Choose a mission...
                </option>
                {missionsFitToLinkOptionElements}
            </select>
        </div>
    );
};