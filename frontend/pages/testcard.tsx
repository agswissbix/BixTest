import React, { useState } from 'react';
import '../app/globals.css';
import { CircleX } from 'lucide-react';

interface TableData {
    id: number;
    title: string;
    description: string;
}

const initialData: TableData[] = [
    { id: 1, title: "Elemento 1", description: "Descrizione dettagliata dell'elemento 1" },
    { id: 2, title: "Elemento 2", description: "Descrizione dettagliata dell'elemento 2" },
    { id: 3, title: "Elemento 3", description: "Descrizione dettagliata dell'elemento 3" },
    { id: 4, title: "Elemento 4", description: "Descrizione dettagliata dell'elemento 4" },
];

const TableWithCardDeck = () => {
    const [openCards, setOpenCards] = useState<number[]>([]);
    const [closingCard, setClosingCard] = useState<number | null>(null); // Stato per gestire la card in chiusura

    const handleRowClick = (id: number) => {
        if (!openCards.includes(id)) {
            //appendi l'id all'inizio dell'array
            setOpenCards([id, ...openCards]);
        }
    };

    const handleCloseCard = (id: number) => {
        setClosingCard(id); // Imposta la card in chiusura

        // Rimuove la card dopo la transizione di 500ms
        setTimeout(() => {
            setOpenCards(openCards.filter(openId => openId !== id));
            setClosingCard(null); // Resetta lo stato della card in chiusura
        }, 200); // Deve corrispondere alla durata della transizione
    };

    return (
        <div className="flex h-screen">
            {/* Tabella a sinistra */}
            <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-t-lg">
                            Titolo
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {initialData.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => handleRowClick(item.id)}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap border-t">
                                {item.title}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Area delle card a destra */}
            <div className="w-1/2 flex flex-col items-center justify-center gap-4 p-6">
                {/* Mazzo di carte */}
                <div className="relative w-full h-96 flex justify-center items-end">
                    {openCards.map((id, index) => {
                        const item = initialData.find(d => d.id === id);
                        const isClosing = id === closingCard; // Verifica se la card è in chiusura

                        return (
                            <div
                                key={id}
                                className={`
                  absolute 
                  bg-white rounded-2xl shadow-2xl
                  transition-all duration-200 ease-out
                  border border-gray-300
                  w-[350px] h-[450px]
                  cursor-default
                  ${isClosing ? 'transform translate-x-16 opacity-0' : ''}
                `}
                                style={{
                                    transform: `
                    translateX(${index * -30}px) 
                    translateY(${index * 15}px)
                    rotate(${index * -2}deg)
                  `,
                                    zIndex: openCards.length - index,
                                }}
                            >
                                <div
                                    onClick={() => handleBookmarkClick(id)}
                                    className="float-left w-6 h-12 bg-gray-400 text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                                >
                      <span className="text-lg font-semibold -rotate-90">
                        {item?.id}
                      </span>
                                </div>
                                <div className="p-6 relative">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {item?.title}
                                        </h3>
                                        <CircleX onClick={() => handleCloseCard(id)} className="w-5 h-5 min-w-[20px] text-red-500 hover:text-red-700 cursor-pointer"/>
                                    </div>
                                    <p className="text-gray-600 text-base">
                                        {item?.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TableWithCardDeck;
