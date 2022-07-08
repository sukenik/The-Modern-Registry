import { CSSProperties } from "react";
import { arrowBorderCSS } from "../Components/ArrowButton";
import { Mission } from "../Custom-Typings/Mission";
import { getSelfAndParentMissions } from "./searchBarLogic";

export const setArrowBorder = (missionID: number, isArrowUp: boolean) => {
    const element = document.getElementById(`Mission-${missionID}`)?.querySelector('div')?.querySelector('div');
    if (element) {
        if (isArrowUp) {
            element.style.borderBottom = arrowBorderCSS;
            element.style.borderTop = '0'; 
        } else {
            element.style.borderTop = arrowBorderCSS;
            element.style.borderBottom = '0';
        }
    }
};
export const getMissionsData = (missions: Array<Mission>, debounceText: string = '', statusFilter: string = 'default'): 
    Array<Mission> => {

    if (!debounceText && statusFilter === 'default') {
        return setHasChildren(missions)
    }
    else if (!debounceText) {
        return filterMissionsByStatus(missions, statusFilter)
    } 
    else if (statusFilter === 'default') {
        return filterMissionsByText(missions, debounceText)
    }

    return filterMissionsByTextAndStatus(missions, debounceText, statusFilter)
}
export const getMissionWidth = (css: CSSProperties, level: number) => {
    const missionWidthPixelMinimum = 380;
    if (level >= 6) return {...css, width: missionWidthPixelMinimum};
    const primaryWidth = 530;
    return {...css, width: primaryWidth - level * 25} as CSSProperties
}
export const getSubMissionPadding = (css: CSSProperties, level: number) => {
    if (level >= 7) return {...css, paddingLeft: 0} as CSSProperties
    return css
}
const setHasChildren = (missions: Array<Mission>) => {
    return missions.map((mission) => ({
        ...mission,
        hasChildren: missions.filter(m => m.parentId === mission.id).length > 0
    }))
}
const validateStatusFilter = (statusFilter: string, missionStatus: string): boolean => 
    statusFilter === 'default' ? true : statusFilter === missionStatus

const filterMissionsByStatus = (missions: Array<Mission>, status: string): Array<Mission> => {

    return setHasChildren(missions.reduce((accum, mission) => {
        if (validateStatusFilter(status, mission.status) && !accum.some(am => am.id === mission.id)) {

            if (mission.parentId) {
                getSelfAndParentMissions(mission, [], missions).forEach(m => {
                    if (!accum.some(am => am.id === m.id)) {
                        accum.push(m)
                    }
                })
            } else {
                accum.push(mission)
            }
        }
        return accum
    }, [] as Array<Mission>))
}
const filterMissionsByText = (missions: Array<Mission>, text: string): Array<Mission> => {

    const searchResults: Array<Mission> = missions.filter(
        mission => mission.description.toLowerCase().includes(text.toLowerCase())
    )
    const missionTrees: Array<Array<Mission>> = searchResults.map(mission => getSelfAndParentMissions(mission, [], missions))
    
    return setHasChildren(missionTrees.reduce((accum, iterator) => {
        iterator.forEach(mission => {
            if (!accum.some(am => am.id === mission.id)) {
                accum.push(mission)
            }
        })
        return accum
    }, [] as Array<Mission>))
}
const filterMissionsByTextAndStatus = (missions: Array<Mission>, text: string, status: string): Array<Mission> => {

    const searchResults: Array<Mission> = missions.filter(
        mission => mission.description.toLowerCase().includes(text.toLowerCase())
    )
    const missionTrees: Array<Array<Mission>> = searchResults.map(mission => getSelfAndParentMissions(mission, [], missions))
    
    return setHasChildren(missionTrees.reduce((accum, iterator) => {
        iterator.forEach(mission => {
            if (validateStatusFilter(status, mission.status) && !accum.some(am => am.id === mission.id)) {
                
                if (mission.parentId) {
                    getSelfAndParentMissions(mission, [], missions).forEach(m => {
                        if (!accum.some(am => am.id === m.id)) {
                            accum.push(m)
                        }
                    })
                } else {
                    accum.push(mission)
                }
            }
        })
        return accum
    }, [] as Array<Mission>))
}