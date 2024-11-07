import { useRouter } from 'next/router';
import { useState } from 'react';
import withAuth from '../utils/withAuth';
import axiosInstance from '../utils/axios';
import ResponseProps from '../utils/responseInterface';
import '../app/globals.css';
import NavbarComp from "@/components/navbar";
import SidebarComp from "@/components/sidebar";
import TableComp from "@/components/table";
import CardComp from "@/components/card";

const Home: React.FC<ResponseProps> = ({ response }) => {
    const [openCards, setOpenCards] = useState<number[]>([]);
    const [closingCard, setClosingCard] = useState<number | null>(null);
    const [isFullScreen, setIsFullscreen] = useState(false);


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

    const handleRowClick = (id: number) => {
        if (!openCards.includes(id)) {
            setOpenCards([id, ...openCards]);
        }
    };

    const handleCloseCard = (id: number) => {
        setClosingCard(id); // Imposta la card in chiusura

        // Rimuove la card dopo l'animazione
        setTimeout(() => {
            setOpenCards(openCards.filter(openId => openId !== id));
            setClosingCard(null); // Resetta lo stato della card in chiusura
        }, 300); // Deve corrispondere alla durata della transizione in `CardComp`
    };


    return (
        <div className="w-screen h-screen">
            <NavbarComp />
            <div className="w-full h-full flex">
                <SidebarComp />
                <div className="relative w-full h-full bg-gray-100">
                    <div className="w-full h-full p-2">
                        <TableComp onRowClick={handleRowClick} />
                    </div>
                    {openCards.length > 0 ? (
                        isFullScreen ? (
                            <div className="absolute top-0 right-0 w-full h-3/4 p-2 rounded-lg">
                                <CardComp
                                    openCards={openCards}
                                    closingCard={closingCard}
                                    onCloseCard={handleCloseCard}
                                    isFullScreen={isFullScreen}
                                />
                            </div>
                        ) : (
                            <div className="absolute top-0 right-0 w-2/6 h-3/4 p-2 rounded-lg">
                                <CardComp
                                    openCards={openCards}
                                    closingCard={closingCard}
                                    onCloseCard={handleCloseCard}
                                    isFullScreen={isFullScreen}
                                />
                            </div>
                        )
                    ) : (
                        <div className="hidden absolute top-0 right-0 w-2/6 h-3/4 p-2 rounded-lg">
                            <CardComp
                                openCards={openCards}
                                closingCard={closingCard}
                                onCloseCard={handleCloseCard}
                                setIsFullScreen={setIsFullscreen}
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default withAuth(Home, 'home');
