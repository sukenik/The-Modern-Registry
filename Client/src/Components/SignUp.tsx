import React, { CSSProperties, useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import GithubLogo from "../../Assets/GitHub.png"
import GoogleLogo from "../../Assets/Google.png"

const ICON_STYLES: CSSProperties = {
    height: 24,
    width: 24,
    position: 'absolute',
    display: 'block'
}

export const SignUp: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const { signUp, signWithGoogle, signWithGithub } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const email = emailRef.current
        const password = passwordRef.current
        const passwordConfirm = passwordConfirmRef.current
        
        if (!password) return setError('Please insert password')
        if (!passwordConfirm) return setError('Please insert password confirmation')
        if (!email) return setError('Please insert email')

        if (password.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }
        if (password.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(email.value, password.value)
            navigate('/')
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
    }

    const handleSignWithGoogle = async () => {
        try {
            setError('')
            setLoading(true)
            await signWithGoogle()
            navigate('/')
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
    }
    const handleSignWithGithub = async () => {
        try {
            setError('')
            setLoading(true)
            await signWithGithub()
            navigate('/')
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                        <Button 
                            onClick={handleSignWithGoogle} 
                            disabled={loading} 
                            className="w-100 mt-4"
                            variant="light" 
                            type="button"
                        >
                            <img 
                                style={ICON_STYLES} 
                                src={GoogleLogo} 
                                alt="Sign with Google" 
                            />
                            Sign With Google
                        </Button>
                        <Button 
                            onClick={handleSignWithGithub} 
                            disabled={loading} 
                            className="w-100 mt-2"
                            variant="light" 
                            type="button"
                        >
                            <img 
                                style={ICON_STYLES} 
                                src={GithubLogo} 
                                alt="Sign with GitHub" 
                            />
                            Sign With GitHub
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to={"/login"}>Log In</Link>
            </div>
        </>
    )
}