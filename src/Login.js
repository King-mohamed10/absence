import React, { useState } from 'react';
import './Login.css';
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
        <div className="login-container">
            <div>
                <h2>Connexion</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Se connecter</button>  
            </div>

        </div>
    );
};

export default Login;