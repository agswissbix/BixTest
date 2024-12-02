import { useRouter } from 'next/router';
import React, { useState, Suspense } from 'react';
import withAuth from '../utils/withAuth';
import axiosInstance from '../utils/axios';
import ResponseProps from '../utils/responseInterface';
import '../app/globals.css';
import NavbarComp from "@/components/navbar";
import SidebarComp from "@/components/sidebar";
import TableComp from "@/components/table";
import CardComp from "@/components/card";
import {Toaster} from "sonner";
import LoadingComp from "@/components/loading";
import SettingsComp from "@/components/settings";

const Home: React.FC<ResponseProps> = ({ response }) => {
    const [openCards, setOpenCards] = useState<number[]>([]);
    const [closingCard, setClosingCard] = useState<number | null>(null);
    const [fullscreenCard, setFullscreenCard] = useState<boolean | null>(null);
    const [currentComponent, setCurrentComponent] = useState<string>('');

    // Funzione per cambiare il componente da caricare
    const handleComponentChange = (component: string) => {
        setCurrentComponent(component);
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

    const handleRowClick = (id: number) => {
        if (!openCards.includes(id)) {
            setOpenCards([id, ...openCards]);
        }
    };


    const handleCloseCard = (id: number) => {
        setClosingCard(id);
        setFullscreenCard(null);

        setTimeout(() => {
            setOpenCards(openCards.filter(openId => openId !== id));
            setClosingCard(null);
        }, 300);
    };

    return (
        <div className="w-screen h-screen">
            <Toaster richColors position="bottom-right" />

            <NavbarComp />
            <div className="w-full h-full flex">
                <SidebarComp onChangeComponent={handleComponentChange} />
                <div className=" relative w-full h-full bg-gray-100">
                    <Suspense fallback={<LoadingComp />}>
                        <div className="home-content">
                            {currentComponent === 'SettingsComp' && <SettingsComp />}
                        </div>
                    </Suspense>

                    <div className="w-full h-full p-2">
                        <TableComp onRowClick={handleRowClick} />
                    </div>
                    {openCards.length > 0 && (
                        <div
                            className={`absolute top-0 right-0 p-2 rounded-lg transition-all duration-300
                                ${fullscreenCard !== null ? 'w-5/6 h-5/6' : 'w-2/6 h-3/4'}`}
                        >
                            <CardComp
                                openCards={openCards}
                                closingCard={closingCard}
                                onCloseCard={handleCloseCard}
                                setFullscreenCard={setFullscreenCard}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home, 'home');