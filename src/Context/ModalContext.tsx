import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface iModalContext {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>
}
const ShowModalContext = React.createContext<iModalContext | null>(null);

export const useShowModalContext = () => useContext(ShowModalContext) as iModalContext;

export const ShowModalProvider: React.FC = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <ShowModalContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </ShowModalContext.Provider>
    );
}