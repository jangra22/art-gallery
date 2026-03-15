import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            
            if (res.ok) {
                if(data.isAdmin) {
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    navigate('/admin/dashboard');
                } else {
                    alert('Not authorized as Admin');
                }
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="w-full max-w-sm bg-white p-8 shadow-md">
                <h1 className="text-xl font-sans tracking-wide text-center mb-6 text-gray-800">Admin Portal</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Admin Email"
                        className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-black text-white py-2 text-sm uppercase tracking-widest hover:bg-gray-800">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
