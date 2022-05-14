import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface iModalContext {
    showMissionModal: boolean,
    setShowMissionModal: Dispatch<SetStateAction<boolean>>,
    showDeleteModal: boolean,
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>
}
const ShowModalContext = React.createContext<iModalContext | null>(null);

export const useShowModalContext = () => useContext(ShowModalContext) as iModalContext;

export const ShowModalProvider: React.FC = ({ children }) => {
    const [showMissionModal, setShowMissionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <ShowModalContext.Provider value={{ showMissionModal, setShowMissionModal, showDeleteModal, setShowDeleteModal }}>
            {children}
        </ShowModalContext.Provider>
    );
}