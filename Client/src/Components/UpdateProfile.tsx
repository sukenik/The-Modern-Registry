import React, { useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { EMAIL_AUTH } from "./UserModal"

const UpdateProfile: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const email = emailRef.current
        const password = passwordRef.current
        const passwordConfirm = passwordConfirmRef.current
        
        if (!password) return setError('Please insert password')
        if (!passwordConfirm) return setError('Please insert password confirmation')
        if (!email) return setError('Please insert email')
        
        if (password.value.length && password.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }
        if (password.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setError('')
        setLoading(true)

        if (email.value !== currentUser?.email) {
            promises.push(updateUserEmail(email.value))
        }
        if (password.value) {
            promises.push(updateUserPassword(password.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('Failed to update account')
            setLoading(false)
        })
    }

    return (
        <>
            {
                currentUser?.providerData[0].providerId === EMAIL_AUTH &&
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser?.email ?? ''} />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label className="mt-2">Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    ref={passwordRef} 
                                    placeholder="Leave blank to keep the same" 
                                />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label className="mt-2">Password Confirmation</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    ref={passwordConfirmRef} 
                                    placeholder="Leave blank to keep the same" 
                                />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4" type="submit">Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
            }
            <div className="w-100 text-center mt-2">
                <Link to={"/"}>Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile