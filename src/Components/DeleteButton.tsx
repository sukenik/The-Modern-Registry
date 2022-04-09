import React from "react";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';

interface Props {

};

export const DeleteButton: React.FC<Props> = () => {
    return (
        <button className="MissionInfoField optionBtn">
            <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
        </button>
    );
};