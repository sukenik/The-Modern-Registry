import { hot } from "react-hot-loader";
import React from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionList } from "./Components/FilterableMissionList";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";

export interface Mission {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    fatherID?: number
};

const missions: Array<Mission> = [
    {id: 1, description: 'Order SuperPizza!', status: 'Active'},
    {id: 2, description: 'Go to the mall', status: 'Active'},
    {id: 3, description: 'Eat pizza :)', status: 'Active'},
    {id: 4, description: 'Take a shower', status: 'Active'},
    {id: 5, description: 'Pump up some music', status: 'Active'},
];

const App: React.FC = () => {
    return (
        <div>
            <Title />
            <FilterableMissionList>
                <SearchBar />
                <MissionList missions={missions} />
            </FilterableMissionList>
        </div>
    );
};

export default hot(module)(App);