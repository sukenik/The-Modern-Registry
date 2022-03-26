import React from "react";

interface Props {

};

export const FilterableMissionList: React.FC<Props> = (props) => {
    return (
        <div id="FilterableMissionList">
            {props.children}
        </div>
    );
};