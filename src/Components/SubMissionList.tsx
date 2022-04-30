import React from "react";
import { Mission } from "../Custom-Typings/Mission";
import { getSubMissionComponentList, setMissionElementWidth } from "../Logic/subMissionLogic";

interface Props {
    subMissions: Mission[],
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setAreButtonsShown: React.Dispatch<React.SetStateAction<boolean>>
};

export const SubMissionList: React.FC<Props> = ({ subMissions, setShowModal, setAreButtonsShown }) => {
    const subMissionList = getSubMissionComponentList(subMissions, setShowModal);
    const handleOnMouseEnter = () => {
        setAreButtonsShown(false);
    };
    const handleOnMouseLeave = () => {
        setAreButtonsShown(true);
    };

    return (
        <ul id="sub-mission-list" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {subMissionList}
        </ul>
    );
};