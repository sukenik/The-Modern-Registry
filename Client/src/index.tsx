import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { StylesProvider } from './Context/StylesContext'
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
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

require('dotenv').config()
export const endpoint = process.env.NODE_URL || 'http://localhost:4000/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            alert(`Graphql Error ${message}`)
        })
    }
})

const link = from([
    errorLink,
    new HttpLink({ uri: endpoint })
])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

const root = document.getElementById("root")
render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route 
                        path='/' 
                        element={
                            <PrivateRoute>
                                <StylesProvider>
                                    <ShowModalProvider>
                                        <App />
                                    </ShowModalProvider>
                                </StylesProvider>
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path='/update-profile' 
                        element={<PrivateRoute><AuthPage><UpdateProfile /></AuthPage></PrivateRoute>} 
                    />
                    <Route path='/signup' element={<AuthPage><SignUp /></AuthPage>} />
                    <Route path='/login' element={<AuthPage><Login /></AuthPage>} />
                    <Route path='/forgot-password' element={<AuthPage><ForgotPassword /></AuthPage>} />
                </Routes>
            </Router>
        </ApolloProvider>
    </AuthProvider>
    , root
)