import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { DarkThemeProvider } from './Context/DarkThemeContext';
import { MissionsProvider } from './Context/MissionsContext';
import { ShowModalProvider } from './Context/ModalContext';
import './styles.css';

const root = document.getElementById("root");
render(
    <ShowModalProvider>
        <MissionsProvider>
            <DarkThemeProvider>
                <App/>
            </DarkThemeProvider>
        </MissionsProvider>
    </ShowModalProvider>
    , root
);