import React, { useEffect, useState } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { setMissionElementWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { DeleteModal } from "./DeleteModal";
import { EditButton } from "./EditButton";
import { SubMissionList } from "./SubMissionList";

interface iMissionRowProps {
    mission: Mission,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionRow: React.FC<iMissionRowProps> = ({ mission, setShowModal }) => {
    const [isSubMissionListShown, setIsSubMissionListShown] = useState(false);
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    useEffect(() => setMissionElementWidth(mission.parentID, mission.id));
    const showSubMissionList = isSubMissionListShown && mission.subMissions.length > 0;

    return (
        <li 
            className='Mission'
            id={`Mission-${mission.id}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <ArrowButton setIsSubMissionListShown={setIsSubMissionListShown} />
            <div className="MissionField name" id="MissionName">{mission.description}</div>
            <div className="MissionInfoField" id="MissionStatus">
                <div id="status">{mission.status}</div>
            </div>
            <div className="MissionField" id="MissionInfo">
                {areButtonsShown && <><EditButton mission={mission} /><DeleteButton mission={mission} /></>}
            </div>
            {showSubMissionList && 
                <SubMissionList
                    subMissions={mission.subMissions}
                    setShowModal={setShowModal}
                    setAreButtonsShown={setAreButtonsShown} />}
            <DeleteModal />
        </li>
    );
};