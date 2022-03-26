import React, { useState } from "react";
import { Mission } from "../App";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';

interface Props {
    id: number,
    description: string,
    status: 'Active' | 'Complete'
};

export const MissionRow: React.FC<Props> = ({description, status}) => {
    const [isShown, setIsShown] = useState(false);
    
    return (
        <div id="Mission"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            <div 
                className="MissionField" 
                id="MissionName">{description}</div>
            <div className="MissionField" id="MissionInfo">
                <div 
                    className="MissionInfoField" 
                    id="MissionStatus">{status}</div>
                {isShown && <button 
                    className="MissionInfoField">Edit
                </button>}
                {isShown && <button 
                    className="MissionInfoField">
                        <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
                </button>}
            </div>
        </div>
    );
};