import React, { CSSProperties } from "react";

const TITLE_STYLES: CSSProperties = {
    marginTop: -10,
    marginRight: -10,
    marginBottom: 0,
    marginLeft: -10,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'aliceblue',
    cursor: 'default'
};

interface iTitleProps {
    titleName: string
};

export const Title: React.FC<iTitleProps> = ({ titleName }) => {
    return (
        <header>
            <h1 style={TITLE_STYLES}>{titleName}</h1>
        </header>
    );
};