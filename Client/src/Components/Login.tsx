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

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login, signWithGoogle, signWithGithub } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const email = emailRef.current
        const password = passwordRef.current
        
        if (!password) return setError('Please insert password')
        if (!email) return setError('Please insert email')

        if (password.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }

        try {
            setError('')
            setLoading(true)
            await login(email.value, password.value)
            navigate('/')
        } catch {
            setError('Failed to sign in')
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
            setError('Failed to sign in')
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
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
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
                    <div className="w-100 text-center mt-3">
                        <Link to={"/forgot-password"}>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to={"/signup"}>Sign Up</Link>
            </div>
        </>
    )
}

export default Login