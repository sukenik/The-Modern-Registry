import React, { CSSProperties } from "react";
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';
import { Mission } from "../Custom-Typings/Mission";
import { useCurrentMission } from '../Context/MissionContext';
import { useShowModalContext } from "../Context/ModalContext";
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

interface iEditButtonProps {
    mission: Mission,
};

export const EditButton: React.FC<iEditButtonProps> = ({ mission }) => {
    const { setShowMissionModal } = useShowModalContext();
    const { setCurrentMission } = useCurrentMission();
    const handleEditButtonClick = () => modalAction(setShowMissionModal, setCurrentMission, mission);

    return (
        <button style={BUTTON_STYLES} onClick={handleEditButtonClick}>
            <img style={ICON_STYLES} src={pencilIcon} alt="Edit button" />
        </button>
    );
};