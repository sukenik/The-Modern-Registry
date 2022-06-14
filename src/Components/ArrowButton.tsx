import React, { CSSProperties } from "react";

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
    setShowSubMissionList: React.Dispatch<React.SetStateAction<boolean>>,
    setArrowButttonClicked: React.Dispatch<React.SetStateAction<boolean>>,
    arrowButttonClicked: boolean
};

export const ArrowButton: React.FC<iArrowButtonProps> = ({ setShowSubMissionList, setArrowButttonClicked, arrowButttonClicked }) => {
    
    const handleArrowClick = () => {
        setArrowButttonClicked(prevState => !prevState)
        setShowSubMissionList(prevState => !prevState)
    }

    return <div style={arrowButttonClicked ? ARROW_DOWN_STYLES : ARROW_UP_STYLES} onClick={handleArrowClick} />
};