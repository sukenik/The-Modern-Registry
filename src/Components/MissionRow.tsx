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

export const MissionRow: React.FC<Props> = ({id, description, status, fatherID, setShowEditModal, setShowModal}) => {
    let isSubMission: boolean = false;
    if (typeof fatherID === 'number') {
        isSubMission = true;
    }
    
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleEditButtonClick = () => {
        setShowModal(true);
        setShowEditModal(true);
    }
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    const handleArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.currentTarget.className.includes('up') ? 
            e.currentTarget.className="arrow" : 
            e.currentTarget.className="arrow-up";
    }
    
    return (
        <div 
            className={isSubMission ? 'Mission sub-mission' : 'Mission'}
            id={"Mission-" + id}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <div className="arrow" onClick={(e) => handleArrowClick(e)}></div>
            <div className="MissionField" id="MissionName">
                {description}
            </div>
            <div className="MissionInfoField" id="MissionStatus">{status}</div>
            <div className="MissionField" id="MissionInfo">
                {areButtonsShown && <button 
                    className="MissionInfoField optionBtn"
                    onClick={handleEditButtonClick}>
                        <img id="PencilIcon" src={pencilIcon} alt="Edit button" />
                </button>}
                {areButtonsShown && <button className="MissionInfoField optionBtn">
                        <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
                </button>}
            </div>
        </div>
    );
};