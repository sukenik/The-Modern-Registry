import React, { useState } from "react";
import { Mission } from "../App";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionRow: React.FC<Props> = ({description, status, setShowModal}) => {
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    
    return (
        <div id="Mission"
            onMouseEnter={() => setAreButtonsShown(true)}
            onMouseLeave={() => setAreButtonsShown(false)}>
            <div 
                className="MissionField" 
                id="MissionName">{description}</div>
            <div className="MissionField" id="MissionInfo">
                <div 
                    className="MissionInfoField" 
                    id="MissionStatus">{status}</div>
                {areButtonsShown && <button 
                    className="MissionInfoField optionBtn"
                    onClick={() => setShowModal(true)}>
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