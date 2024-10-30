'use client'

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false, // prevents auto-redirect so you can handle success/failure manually
            email,
            password,
        });

        if (result?.error) {
            setError(result.error); // display error if authentication fails
        } else {
            // Redirect or handle success
            window.location.href = '/dashboard';
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            {/* <form onSubmit={handleSubmit}> */}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleSubmit}>Sign In</button>
            {/* </form> */}
        </div>
    );
}
