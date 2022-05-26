import React from "react";

interface iTitleProps {
    titleName: string
}

export const Title: React.FC<iTitleProps> = ({ titleName }) => {
    return (
        <header>
            <h1 id="Title">{titleName}</h1>
        </header>
    );
};