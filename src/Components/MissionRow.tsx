import React, { useState } from "react";
import { Mission } from "../App";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    fatherID: number | null,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionRow: React.FC<Props> = ({description, status, setShowEditModal, setShowModal}) => {
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleEditButtonClick = () => {
        setShowModal(true);
        setShowEditModal(true);
    }
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    
    return (
        <div id="Mission"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <div 
                className="MissionField" 
                id="MissionName">{description}</div>
            <div className="MissionField" id="MissionInfo">
                <div 
                    className="MissionInfoField" 
                    id="MissionStatus">{status}</div>
                {areButtonsShown && <button 
                    className="MissionInfoField optionBtn"
                    onClick={handleEditButtonClick}>
                        <img id="PencilIcon" src={pencilIcon} alt="Edit button" />
                </button>}
                {areButtonsShown && <button 
                    className="MissionInfoField optionBtn">
                        <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
                </button>}
            </div>
        </div>
    );
};