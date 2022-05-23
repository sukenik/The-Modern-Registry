import React from "react";

interface iArrowButtonProps {
    setShowSubMissionList: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ArrowButton: React.FC<iArrowButtonProps> = ({setShowSubMissionList}) => {
    const handleArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(e.currentTarget.className.includes('up')) {
            e.currentTarget.className="arrow";
            setShowSubMissionList(false);
        } else {
            e.currentTarget.className="arrow-up";
            setShowSubMissionList(true);
        }
    }

    return (
        <div className="arrow" onClick={handleArrowClick}></div>
    );
};