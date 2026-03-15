import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // In real app, invoke auth context login
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Save token
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/'); // Redirect to home
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12">
            <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-sm animate-fade-in">
                <h2 className="text-3xl font-serif text-center mb-8 text-primary">Sign In</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-secondary mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-secondary mb-2">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-3 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <p className="text-secondary">Don't have an account? <Link to="/signup" className="text-black border-b border-black pb-0.5">Create one</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
