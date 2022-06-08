import React, { CSSProperties, useEffect } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { setArrowBorder } from "../Logic/subMissionLogic";

export const arrowBorderCSS = '15px solid rgb(255, 255, 255)';
const ARROW_STYLES: CSSProperties = {
    width: 0,
    height: 0,
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: arrowBorderCSS,
    borderBottom: 0,
    alignSelf: 'center',
    marginLeft: 5,
    order: 1,
    cursor: 'pointer'
};

interface iArrowButtonProps {
    setShowSubMissionList: React.Dispatch<React.SetStateAction<boolean>>,
    setArrowButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
    arrowButtonClicked: boolean,
    mission: Mission
};

export const ArrowButton: React.FC<iArrowButtonProps> = ({ 
    setShowSubMissionList, 
    setArrowButtonClicked, 
    arrowButtonClicked, 
    mission }) => {
    
    useEffect(() => setArrowBorder(mission.id, arrowButtonClicked), [arrowButtonClicked, mission]);
    const handleArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (arrowButtonClicked) {
            e.currentTarget.style.borderTop = arrowBorderCSS;
            e.currentTarget.style.borderBottom = '0';
            setShowSubMissionList(false);
            setArrowButtonClicked(false);
        } else {
            e.currentTarget.style.borderBottom = arrowBorderCSS;
            e.currentTarget.style.borderTop = '0';
            setShowSubMissionList(true);
            setArrowButtonClicked(true);
        }
    }

    return <div style={ARROW_STYLES} onClick={handleArrowClick} />
};