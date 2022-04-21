import React, { useEffect, useState } from "react";
import { Mission } from "../App";
import { setMissionElementWidth, setPrimaryMissionElementWidth } from "../Logic/SubMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SubMissionList } from "./SubMissionList";

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    parentID: number | null,
    subMissions: Array<Mission>,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionRow: React.FC<Props> = ({id, description, status, parentID, subMissions, 
    setShowEditModal, setShowModal}) => {    
    if (typeof parentID === 'number') {
        useEffect(() => {
            setMissionElementWidth(parentID, id);
        });
    } else {
        setPrimaryMissionElementWidth(id);
    }

    const [isSubMissionListShown, setIsSubMissionListShown] = useState(false);
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleOnMouseEnter = () => {
        setAreButtonsShown(true);
    };
    const handleOnMouseLeave = () => {
        setAreButtonsShown(false);
    };

    return (
        <li 
            className='Mission'
            id={`Mission-${id}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <ArrowButton setIsSubMissionListShown={setIsSubMissionListShown} />
            <div className="MissionField" id="MissionName">{description}</div>
            <div className="MissionInfoField" id="MissionStatus">
                <div id="status">{status}</div>
            </div>
            <div className="MissionField" id="MissionInfo">
                {areButtonsShown && <EditButton setShowEditModal={setShowEditModal} setShowModal={setShowModal} />}
                {areButtonsShown && <DeleteButton />}
            </div>
            {isSubMissionListShown && 
                <SubMissionList 
                    subMissions={subMissions} 
                    setShowEditModal={setShowEditModal} 
                    setShowModal={setShowModal}
                    setAreButtonsShown={setAreButtonsShown} />}
        </li>
    );
};