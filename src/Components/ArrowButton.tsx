import React, { useEffect } from "react";
import { useCurrentMission } from "../Context/MissionContext";
import { Mission } from "../Custom-Typings/Mission";

interface iArrowButtonProps {
    setShowSubMissionList: React.Dispatch<React.SetStateAction<boolean>>,
    setArrowButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
    arrowButtonClicked: boolean,
    mission: Mission
};

export const ArrowButton: React.FC<iArrowButtonProps> = ({ setShowSubMissionList, setArrowButtonClicked, arrowButtonClicked, 
        mission }) => {
    useEffect(() => {
        const element = document.getElementById(`Mission-${mission.id}`);
        if (arrowButtonClicked) {
            if (element) element.children[0].className = 'arrow-up';
        } else {
            if (element) element.children[0].className = 'arrow';
        }
    }, [arrowButtonClicked, mission]);
    const handleArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.currentTarget.className.includes('up')) {
            e.currentTarget.className="arrow";
            setShowSubMissionList(false);
            setArrowButtonClicked(false);
        } else {
            e.currentTarget.className="arrow-up";
            setShowSubMissionList(true);
            setArrowButtonClicked(true);
        }
    }

    return (
        <div className="arrow" onClick={handleArrowClick}></div>
    );
};