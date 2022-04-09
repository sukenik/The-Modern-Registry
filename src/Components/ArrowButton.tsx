import React from "react";

interface Props {
    setIsSubMissionListShown: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ArrowButton: React.FC<Props> = ({setIsSubMissionListShown}) => {
    const handleArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(e.currentTarget.className.includes('up')) {
            e.currentTarget.className="arrow";
            setIsSubMissionListShown(false);
        } else {
            e.currentTarget.className="arrow-up";
            setIsSubMissionListShown(true);
        }
    }

    return (
        <div className="arrow" onClick={(e) => handleArrowClick(e)}></div>
    );
};