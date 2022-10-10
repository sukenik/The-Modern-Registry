import React, { CSSProperties } from "react";
import { Mission } from "../../../Entities/Mission";
import { useCurrentMissionContext } from '../Context/CurrentMissionContext';
import { useShowModalContext } from "../Context/ModalContext";
import { iModalActionParams, modalAction } from "../Logic/helperFunctions";

const BUTTON_STYLES: CSSProperties = {
    border: 'none',
    background: 'transparent'
};
const ICON_STYLES: CSSProperties = {
    height: 18,
    width: 18,
    cursor: 'pointer'
};

interface iButtonProps {
    mission: Mission,
    icon: any,
    setIsDelete?: React.Dispatch<React.SetStateAction<boolean>>
};

export const OptionButton: React.FC<iButtonProps> = ({ mission, icon, setIsDelete }) => {
    const { setShowMissionModal } = useShowModalContext()
    const { setCurrentMission } = useCurrentMissionContext()
    
    const handleButtonClick = () => modalAction({ 
        setCurrentMission: setCurrentMission, 
        setShowModal: setShowMissionModal, 
        mission: mission,
        setIsDelete: setIsDelete
    } as iModalActionParams)

    return (
        <button style={BUTTON_STYLES} onClick={handleButtonClick}>
            <img style={ICON_STYLES} src={icon} alt="Option button" />
        </button>
    );
};