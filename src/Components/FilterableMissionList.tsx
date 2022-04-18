import React from "react";

interface Props {

};

export const FilterableMissionList: React.FC<Props> = ({children}) => {
    return (
        <div id="FilterableMissionList">
            {children}
        </div>
    );
};