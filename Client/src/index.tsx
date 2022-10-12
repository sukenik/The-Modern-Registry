import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { DarkThemeProvider } from './Context/DarkThemeContext'
import { MissionsProvider } from './Context/MissionsContext'
import { ShowModalProvider } from './Context/ModalContext'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './Context/AuthContext'
import { AuthPage } from './Pages/AuthPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = document.getElementById("root")
render(
    <ShowModalProvider>
        <MissionsProvider>
            <DarkThemeProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<AuthPage />} />
                            <Route path='/home' element={<App />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </DarkThemeProvider>
        </MissionsProvider>
    </ShowModalProvider>
    , root
)