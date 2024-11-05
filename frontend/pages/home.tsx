// pages/home.tsx
// import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {useState} from "react";
import withAuth from '../utils/withAuth';  // Import the HOC
import axiosInstance from '../utils/axios';
import ResponseProps from '../utils/responseInterface';
import '../app/globals.css';
import NavbarComp from "@/components/navbar";
import SidebarComp from "@/components/sidebar";

const Home: React.FC<ResponseProps> = ({ response }) => {
    const [message, setMessage] = useState('');
    const router = useRouter();
    console.log(response);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('logout/');
            router.push('/login');
        } catch (error) {
            console.error('Errore durante il logout', error);
        }
    };

    return (
        <div className="w-screen">
            < NavbarComp />
            < SidebarComp />
        </div>
    );
};

// Export Home wrapped by the withAuth HOC
export default withAuth(Home, 'home');
