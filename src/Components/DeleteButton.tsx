import React, { CSSProperties } from "react";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';
import { useCurrentMissionContext } from "../Context/CurrentMissionContext";
import { useShowModalContext } from "../Context/ShowModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { modalAction } from "../Logic/helperFunctions";

const BUTTON_STYLES: CSSProperties = {
    border: 'none',
    background: 'transparent'
};
const ICON_STYLES: CSSProperties = {
    height: 18,
    width: 18,
    cursor: 'pointer'
};

interface iDeleteButtonProps {
    mission: Mission
};

export const DeleteButton: React.FC<iDeleteButtonProps> = ({ mission }) => {
    const { setShowDeleteModal } = useShowModalContext();
    const { setCurrentMission } = useCurrentMissionContext();
    const handleDeleteButtonClick = () => modalAction(setShowDeleteModal, setCurrentMission, mission);

    return (
        <button style={BUTTON_STYLES} className="MissionInfoField" onClick={handleDeleteButtonClick}>
            <img style={ICON_STYLES} src={trashCanIcon} alt="Delete button" />
        </button>
    );
};