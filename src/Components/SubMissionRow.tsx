import React, { ReactElement, useState } from "react";
import { Mission } from "../App";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    fatherID: number | null,
    subMissions: Array<Mission>,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const SubMissionRow: React.FC<Props> = ({id, description, status, fatherID, subMissions, setShowEditModal, setShowModal}) => {
    const [isSubMissionListShown, setIsSubMissionListShown] = useState(false);
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    
    const subMissionsList: Array<ReactElement> = [];
    subMissions.forEach((subMission: Mission) => {
        subMissionsList.push(
            <SubMissionRow 
                key={subMission.id} 
                id={subMission.id}
                description={subMission.description}
                status={subMission.status}
                fatherID={subMission.fatherID}
                subMissions={subMission.subMissions}
                setShowEditModal={setShowEditModal}
                setShowModal={setShowModal} />
        );
    });

    return (
        <div>
            <div 
                className='Mission'
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
            </div>
            {isSubMissionListShown && subMissionsList}
        </div>
    );
};