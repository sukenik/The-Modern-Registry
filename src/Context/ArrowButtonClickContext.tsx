import React, { SetStateAction, useContext, useState } from "react";

interface iArrowButtonClickContext {
    arrowButtonClicked: boolean,
    setArrowButtonClicked: React.Dispatch<SetStateAction<boolean>>
}

const ArrowButtonClickContext = React.createContext<iArrowButtonClickContext | null>(null);
export const useArrowButtonClick = () => useContext(ArrowButtonClickContext) as iArrowButtonClickContext;

export const ArrowButtonClickProvider: React.FC = ({ children }) => {
    const [arrowButtonClicked, setArrowButtonClicked] = useState(false);

    return (
        <ArrowButtonClickContext.Provider value={{ arrowButtonClicked, setArrowButtonClicked }}>
            {children}
        </ArrowButtonClickContext.Provider>
    );
}
