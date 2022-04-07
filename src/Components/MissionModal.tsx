import React from "react";

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
};

export const MissionModal: React.FC<Props> = ({showModal, setShowModal, title, children}) => {
    if (!showModal) {
        return null;
    }
    
    return (
        <div className="modal" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button id="SaveButton">Save</button>
                    <button
                        onClick={() => setShowModal(false)} 
                        className="button"
                        id="CancelButton">Cancel</button>
                </div>
            </div>
        </div>
    );
};