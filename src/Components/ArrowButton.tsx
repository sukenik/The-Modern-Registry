import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";

export const arrowBorderCSS = '15px solid rgb(255, 255, 255)';
const ARROW_UP_STYLES: CSSProperties = {
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
const ARROW_DOWN_STYLES: CSSProperties = {
    ...ARROW_UP_STYLES,
    borderTop: 0,
    borderBottom: arrowBorderCSS
}

interface iArrowButtonProps {
    mission: Mission,
    setShowSubMissionList: React.Dispatch<React.SetStateAction<boolean>>
};

export const ArrowButton: React.FC<iArrowButtonProps> = ({ setShowSubMissionList }) => {
    const [arrowButttonClicked, setArrowButttonClicked] = useState(false)
    
    const handleArrowClick = () => {
        setArrowButttonClicked(prevState => !prevState)
        setShowSubMissionList(prevState => !prevState)
    }

    return <div style={arrowButttonClicked ? ARROW_DOWN_STYLES : ARROW_UP_STYLES} onClick={handleArrowClick} />
};