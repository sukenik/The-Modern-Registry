import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ShowModalProvider } from './Context/ShowModalContext';
import './styles.css';

const root = document.getElementById("root");
render(
    <ShowModalProvider>
        <App/>
    </ShowModalProvider>
    , root
);