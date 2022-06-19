import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { DarkThemeProvider } from './Context/DarkThemeContext';
import { LocalStorageMissionsProvider } from './Context/LocalStorageMissionsContext';
import { ShowModalProvider } from './Context/ModalContext';
import './styles.css';

const root = document.getElementById("root");
render(
    <ShowModalProvider>
        <LocalStorageMissionsProvider>
            <DarkThemeProvider>
                <App/>
            </DarkThemeProvider>
        </LocalStorageMissionsProvider>
    </ShowModalProvider>
    , root
);