import React, { CSSProperties } from "react";

const FILTERABLE_MISSION_LIST_CONTAINER_STYLES = {
    backgroundColor: 'rgb(218, 218, 218)',
    height: '100%',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
    overflow: 'auto'
};

export const FilterableMissionListContainer: React.FC = ({children}) => {
    return (
        <div style={FILTERABLE_MISSION_LIST_CONTAINER_STYLES as CSSProperties}>
            {children}
        </div>
    );
};