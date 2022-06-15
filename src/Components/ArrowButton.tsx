import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useFilteringContext } from "../Context/FilteringContext";

export const arrowBorderCSS = '15px solid rgb(255, 255, 255)';
const ARROW_UP_STYLES: CSSProperties = {
    width: 0,
    height: 0,
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: 0,
    borderBottom: arrowBorderCSS,
    alignSelf: 'center',
    marginLeft: 5,
    order: 1,
    cursor: 'pointer'
};
const ARROW_DOWN_STYLES: CSSProperties = {
    ...ARROW_UP_STYLES,
    borderTop: arrowBorderCSS,
    borderBottom: 0
}

interface iArrowButtonProps {
    setShowSubMissionList: React.Dispatch<React.SetStateAction<boolean>>
};

export const ArrowButton: React.FC<iArrowButtonProps> = ({ setShowSubMissionList }) => {
    const [arrowButtonClicked, setArrowButtonClicked] = useState(false)
    const { closeArrowButtonOnFilter, setCloseArrowButtonOnFilter, debounceText, statusFilter } = useFilteringContext()
    
    useEffect(() => setArrowButtonClicked(false), [])
    useEffect(() => {
        setShowSubMissionList(false)
        setArrowButtonClicked(false)
    }, [debounceText, statusFilter])

    const handleArrowClick = () => {
        setArrowButtonClicked(prevState => !prevState)
        setShowSubMissionList(prevState => !prevState)
        setCloseArrowButtonOnFilter(false)
    }

    return (
        <div 
            style={!closeArrowButtonOnFilter && arrowButtonClicked ? ARROW_UP_STYLES : ARROW_DOWN_STYLES} 
            onClick={handleArrowClick} 
        />
    )
};