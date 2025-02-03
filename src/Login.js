import React, { useState } from 'react';

const Login = ({ onLogin, managers }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simuler une vérification de login
        const manager = managers.find(m => m.username === username && m.password === password);
        if (manager) {
            onLogin(manager.id);
        } else {
            alert('Identifiants incorrects');
        }
    };

    return (
        <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;