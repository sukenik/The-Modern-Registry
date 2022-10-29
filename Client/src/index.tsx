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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import ForgotPassword from './Components/ForgotPassword'
import { SignUp } from './Components/SignUp'
import Login from './Components/Login'
import UpdateProfile from './Components/UpdateProfile'

const root = document.getElementById("root")
render(
    <ShowModalProvider>
        <MissionsProvider>
            <DarkThemeProvider>
                <AuthProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<PrivateRoute><App /></PrivateRoute>} />
                            <Route 
                                path='/update-profile' 
                                element={<PrivateRoute><AuthPage><UpdateProfile /></AuthPage></PrivateRoute>} 
                            />
                            <Route path='/signup' element={<AuthPage><SignUp /></AuthPage>} />
                            <Route path='/login' element={<AuthPage><Login /></AuthPage>} />
                            <Route path='/forgot-password' element={<AuthPage><ForgotPassword /></AuthPage>} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </DarkThemeProvider>
        </MissionsProvider>
    </ShowModalProvider>
    , root
)