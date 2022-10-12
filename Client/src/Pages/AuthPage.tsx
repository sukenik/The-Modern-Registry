import React from "react"
import { Container } from "react-bootstrap"
import { SignUp } from "../Components/SignUp"

export const AuthPage: React.FC = () => {
    return  (
        <Container 
            className="d-flex align-items-center justify-content-center" 
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <SignUp />
            </div>
        </Container>
    )
}