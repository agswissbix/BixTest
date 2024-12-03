import { useRouter } from 'next/router';
import React, { useState, Suspense } from 'react';
import withAuth from '../utils/withAuth';
import axiosInstance from '../utils/axios';
import ResponseProps from '../utils/responseInterface';
import '../app/globals.css';
import NavbarComp from "@/components/navbar";
import SidebarComp from "@/components/sidebar";
import {Toaster} from "sonner";
import LoadingComp from "@/components/loading";
import dynamic from 'next/dynamic';
import TableCardManager from '@/components/tableCardManager';


const SettingsPage = dynamic(() => import("@/pages/settings"), {
    suspense: true,
    loading: () => <LoadingComp /> // Aggiungi questo
});

const Home: React.FC<ResponseProps> = ({ response }) => {
    const [currentComponent, setCurrentComponent] = useState<string>('');
    const [tableid, setTableid] = useState<string>('');

    // Funzione per cambiare il componente da caricare
    const handleComponentChange = async (componentType: string, tableid: string) => {
        try {
            await axiosInstance.post('auth/test_request/');

            {/*Soluzione temporanea per sviluppare tabelle e cards*/}
            if (componentType === 'table') {
                setCurrentComponent('TableCardManager');
                setTableid(tableid);
            } else {
                setCurrentComponent('SettingsPage');
            }
            {/*Soluzione temporanea per sviluppare tabelle e cards*/}

        } catch (error) {
            console.error('Errore durante il logout', error);
        }
    };

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('logout/');
            router.push('/login');
        } catch (error) {
            console.error('Errore durante il logout', error);
        }
    };



    return (
        <div className="w-screen h-screen">
            <Toaster richColors position="bottom-right" />

            <NavbarComp />
            <div className="w-full h-full flex">
                <SidebarComp onChangeComponent={handleComponentChange} />
                <div className=" relative w-full h-full bg-gray-100">
                    <Suspense>
                        {currentComponent === 'SettingsPage' && <SettingsPage />}
                        {currentComponent === 'TableCardManager' && <TableCardManager tableid={tableid} />}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home, 'home');