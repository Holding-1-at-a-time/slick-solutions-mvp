import { useAuth, useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ForgotPasswordPage: NextPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [secondFactor, setSecondFactor] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter()
    const { isSignedIn } = useAuth()
    const { isLoaded, signIn, setActive } = useSignIn()

    if (!isLoaded) {
        return null
    }

    // If the user is already signed in,
    // redirect them to the home page
    if (isSignedIn) {
        router.push('/')
    }

    // Send the password reset code to the user's email
    async function sendResetCode(event: React.FormEvent) {
        event.preventDefault()
        try {
            const { createdSessionId } = await signIn?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            await signIn?.sendVerification({ sessionId: createdSessionId })
            setSuccessfulCreation(true)
            setError('')
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }


    // Reset the user's password.
    // Upon successful reset, the user will be
    // signed in and redirected to the home page
    async function reset(e: React.FormEvent) {
        e.preventDefault()
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then((result) => {
                // Check if 2FA is required
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true)
                    setError('')
                } else if (result.status === 'complete') {
                    // Set the active session to
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId })
                    setError('')
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage)
            })
    }

    return (
        <div
            style={{
                margin: 'auto',
                maxWidth: '500px',
            }}
        >
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                }}
                onSubmit={!successfulCreation ? create : reset}
            >
                <button onClick={(event) => sendResetCode(event)}>Send Reset Code</button>
                
                {!successfulCreation && (
                    <>
                        <label htmlFor="email">Please provide your email address</label>
                        <input
                            type="email"
                            placeholder="e.g john@doe.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button>Send password reset code</button>
                        {error && <p>{error}</p>}
                    </>
                )}

                {successfulCreation && (
                    <>
                        <label htmlFor="password">Enter your new password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <label htmlFor="password">
                            Enter the password reset code that was sent to your email
                        </label>
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

                        <button>Reset</button>
                        {error && <p>{error}</p>}
                    </>
                )}

                {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
            </form>
        </div>
    )
}

export default ForgotPasswordPage