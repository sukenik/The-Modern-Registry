import React, { CSSProperties, useState } from "react";
import { Mission } from "../../../Entities/Mission";
import { getMissionWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';
import { OptionButton } from "./OptionButton";
import { useShowModalContext } from "../Context/ModalContext";
import { useStylesContext } from "../Context/StylesContext";

const MISSION_STYLES: CSSProperties = {
    height: 40,
    backgroundColor: 'rgb(92, 91, 91)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 'var(--width)',
    marginTop: 5
}

const MISSION_INFO_STYLES: CSSProperties = {
    display: 'block',
    width: 85,
    maxHeight: 20,
    order: 4,
    marginBottom: 7,
}

const MISSION_STATUS_STYLES: CSSProperties = {
    flexGrow: 1,
    cursor: 'default',
    order: 3,
    display: 'flex',
    justifyContent: 'flex-end'
}

const STATUS_STYLES: CSSProperties = {
    paddingTop: 2,
    paddingRight: 13,
    paddingBottom: 2,
    paddingLeft: 13,
    backgroundColor: 'rgb(39, 39, 39)'
}

const MISSION_NAME_STYLES: CSSProperties = {
    marginLeft: 20,
    order: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 150,
    whiteSpace: 'nowrap',
    cursor: 'default'
}

const LIST_ITEM_STYLE: CSSProperties = {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
}

interface iMissionRowProps {
    mission: Mission,
    level: number,
    hasChildren: boolean
}

export const MissionRow: React.FC<iMissionRowProps> = ({ mission, children, level, hasChildren }) => {
    const [showSubMissionList, setShowSubMissionList] = useState(false)
    const [showOptionButtons, setShowOptionButtons] = useState(false)
    const { setShowDeleteModal } = useShowModalContext()
    const { isMobile } = useStylesContext()

    const handleOnMouseEnter = () => setShowOptionButtons(true)
    const handleOnMouseLeave = () => setShowOptionButtons(false)
    
    return (
            <li key={mission.id} style={LIST_ITEM_STYLE} id={`Mission-${mission.id}`}>
                <div 
                    style={mission.parentId ? 
                        getMissionWidth(MISSION_STYLES, level) : 
                        getMissionWidth({...MISSION_STYLES, marginTop: 10}, level)
                    }
                    onMouseEnter={handleOnMouseEnter} 
                    onMouseLeave={handleOnMouseLeave}
                >
                    {hasChildren && <ArrowButton setShowSubMissionList={setShowSubMissionList} />}
                    <div style={MISSION_NAME_STYLES} className="name">{mission.description}</div>
                    <div style={MISSION_STATUS_STYLES}>
                        <div 
                            id="mission-status"
                            style={mission.status === 'Active' ? 
                                {...STATUS_STYLES, paddingRight: 26, paddingLeft: 26} : 
                                STATUS_STYLES
                            }
                        >
                            {mission.status}
                        </div>
                    </div>
                    <div style={MISSION_INFO_STYLES}>
                        {(showOptionButtons || isMobile) && 
                            <>
                                <OptionButton mission={mission} icon={pencilIcon} />
                                <OptionButton mission={mission} icon={trashCanIcon} setIsDelete={setShowDeleteModal} />
                            </>
                        }
                    </div>
                </div>
                { (hasChildren && showSubMissionList) && children }
        </li>
    )
}