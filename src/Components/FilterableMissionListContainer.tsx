import React from "react";

export const FilterableMissionListContainer: React.FC = ({children}) => {
    return (
        <div id="filterable-mission-list-container">
            {children}
        </div>
    );
};