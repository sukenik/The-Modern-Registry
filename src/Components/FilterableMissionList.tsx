import React from "react";

interface Props {

};

export const FilterableMissionList: React.FC<Props> = (props) => {
    return (
        <div className="float-child" id="FilterableMissionList">
            {props.children}
        </div>
    );
};