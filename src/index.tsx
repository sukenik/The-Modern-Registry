import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CurrentMissionProvider } from './Context/MissionContext';
import { ShowModalProvider } from './Context/ModalContext';
import './styles.css';

const root = document.getElementById("root");
render(
    <ShowModalProvider>
        <App/>
    </ShowModalProvider>
    , root
);