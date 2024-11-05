// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await axiosInstance.post('login/', { username, password });
          router.push('home'); // Reindirizza alla home dopo un login corretto
        } catch (error) {
          alert('Credenziali sbagliate');
          console.error('Errore durante il Login', error);
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form> 
    );
};

export default Login;
