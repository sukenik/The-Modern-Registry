import React from "react";

interface Props {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
};

export const MissionModal: React.FC<Props> = ({show, setShow, title, children}) => {
    if (!show) {
        return null;
    }
    
    return (
        <div className="modal" onClick={() => setShow(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button>Save</button>
                    <button
                        onClick={() => setShow(false)} 
                        className="button">Cancel</button>
                </div>
            </div>
        </div>
    );
};