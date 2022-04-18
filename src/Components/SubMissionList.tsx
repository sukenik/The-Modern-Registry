import React from "react";
import { Mission } from "../App";
import { getSubMissionComponentList, setMissionElementWidth } from "../Logic/SubMissionLogic";

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

    return (
        <ul id="sub-mission-list" onMouseEnter={handleOnMouseEnter}>
            {subMissionList}
        </ul>
    );
};