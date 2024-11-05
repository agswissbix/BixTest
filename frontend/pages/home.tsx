// pages/home.tsx
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axiosInstance from '../utils/axios';
import { useRouter } from 'next/router';


const Home = () => {
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.post('home/', {
                data: "Some data"
            });
            setMessage(response.data.message);
          } catch (error) {
            console.error('Accesso negato', error);
            router.push('login');
          }
        };
        fetchData();
      }, []);



    const handleLogout = async () => {
        try {
          await axiosInstance.post('logout/'); // Invia la richiesta di logout al backend con CSRF
          router.push('/login'); // Reindirizza alla pagina di login
        } catch (error) {
          console.error('Errore durante il logout', error);
        }
      };

    return (
        <div>
            <h1>Benvenuto nella Home</h1>
            <p>Questa è una pagina protetta.</p>
            {message && <p>Risultato: {message}</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};


export default Home;
