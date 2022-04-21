import React from "react";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';

export const DeleteButton: React.FC = () => {
    return (
        <button className="MissionInfoField optionBtn">
            <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
        </button>
    );
};