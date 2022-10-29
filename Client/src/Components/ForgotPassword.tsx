import React, { useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const ForgotPassword: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const email = emailRef.current
        
        if (!email) return setError('Please insert email')

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(email.value)
            setMessage('Check your inbox spam for further instructions')
        } catch {
            setError('Failed to reset password')
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to={"/login"}>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to={"/signup"}>Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword