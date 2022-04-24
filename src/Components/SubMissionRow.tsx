import React, { ReactElement, useState } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    parentID: number | null,
    subMissions: Array<Mission>,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const SubMissionRow: React.FC<Props> = ({id, description, status, subMissions, parentID,
        setShowEditModal, setShowModal}) => {
    const [isSubMissionListShown, setIsSubMissionListShown] = useState(false);
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    
    

    // TODO: Extract to function plz :)
    const subMissionsList: Array<ReactElement> = [];
    subMissions.forEach((subMission: Mission) => {
        subMissionsList.push(
            <SubMissionRow 
                key={subMission.id} 
                id={subMission.id}
                description={subMission.description}
                status={subMission.status}
                parentID={subMission.parentID}
                subMissions={subMission.subMissions}
                setShowEditModal={setShowEditModal}
                setShowModal={setShowModal} />
        );
    });

    

    return (
        <div 
            className={`Mission sub-mission`}
            id={`Mission-${id}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <ArrowButton setIsSubMissionListShown={setIsSubMissionListShown} />
            <div className="MissionField" id="MissionName">{description}</div>
            <div className="MissionInfoField" id="MissionStatus">{status}</div>
            <div className="MissionField" id="MissionInfo">
                {areButtonsShown && <EditButton setShowEditModal={setShowEditModal} setShowModal={setShowModal} />}
                {areButtonsShown && <DeleteButton />}
            </div>
            {isSubMissionListShown && subMissionsList}
        </div>
    );
};