import React, { ReactElement, useEffect, useState } from "react";
import { Mission } from "../App";
import { giveGenerations } from "../Logic/SubMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SubMissionRow } from "./SubMissionRow";

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    fatherID: number | null,
    subMissions: Array<Mission>,
    generation: number | undefined,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionRow: React.FC<Props> = ({id, description, status, fatherID, subMissions, generation, 
        setShowEditModal, setShowModal}) => {
    if (typeof fatherID === 'number') return null;
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
                generation={generation}
                setShowEditModal={setShowEditModal}
                setShowModal={setShowModal} />
        );
    });
    
    const [isSubMissionListShown, setIsSubMissionListShown] = useState(false);
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    
    return (
        <div>
            <div 
                className={`Mission gen-${generation}`}
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