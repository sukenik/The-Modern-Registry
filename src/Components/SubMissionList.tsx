import React from "react";
import { Mission } from "../Custom-Typings/Mission";
import { MissionRow } from "./MissionRow";

interface Props {
    subMissions: Mission[],
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setAreButtonsShown: React.Dispatch<React.SetStateAction<boolean>>
};

export const SubMissionList: React.FC<Props> = ({ subMissions, setShowModal, setAreButtonsShown }) => {
    const handleOnMouseEnter = () => setAreButtonsShown(false);
    const handleOnMouseLeave = () => setAreButtonsShown(true);

    return (
        <ul id="sub-mission-list" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {subMissions.map(subMission => <MissionRow key={subMission.id} mission={subMission} setShowModal={setShowModal} />)}
        </ul>
    );
};