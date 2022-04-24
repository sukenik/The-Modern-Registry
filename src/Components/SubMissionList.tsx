import React from "react";
import { Mission } from "../Custom-Typings/Mission";
import { getSubMissionComponentList, setMissionElementWidth } from "../Logic/subMissionLogic";

interface Props {
    subMissions: Mission[],
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setAreButtonsShown: React.Dispatch<React.SetStateAction<boolean>>
};

export const SubMissionList: React.FC<Props> = ({subMissions, setShowEditModal, setShowModal, setAreButtonsShown}) => {
    const subMissionList = getSubMissionComponentList(subMissions, setShowEditModal, setShowModal);
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