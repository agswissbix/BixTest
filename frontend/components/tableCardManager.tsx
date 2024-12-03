import TableComp from "@/components/table";
import CardComp from "@/components/card";
import { useState } from "react";

interface TableCardManagerProps {
    tableid: string;
}


const TableCardManager: React.FC<TableCardManagerProps> = ({ tableid }) => {

    const [openCards, setOpenCards] = useState<number[]>([]);
    const [closingCard, setClosingCard] = useState<number | null>(null);
    const [fullscreenCard, setFullscreenCard] = useState<boolean | null>(null);
    
    const handleCloseCard = (recordid: number) => {
        setClosingCard(recordid);
        setFullscreenCard(null);
    
        setTimeout(() => {
            setOpenCards(openCards.filter(openId => openId !== recordid));
            setClosingCard(null);
        }, 300);
    };
    
    const handleRowClick = (recordid: string) => {
        // Aggiunge il nuovo recordid in cima se non è già presente
        if (!openCards.includes(recordid)) {
            setOpenCards([recordid, ...openCards]);
        }
    };
    

    return (
        <div className="w-full h-full p-2">
            <TableComp tableid={tableid} onRowClick={handleRowClick} />

            {openCards.length > 0 && (
                <div className={`absolute top-0 right-0 p-2 rounded-lg transition-all duration-300 ${fullscreenCard !== null ? 'w-5/6 h-5/6' : 'w-2/6 h-3/4'}`}>
                    <CardComp
                        openCards={openCards}
                        closingCard={closingCard}
                        onCloseCard={handleCloseCard}
                        setFullscreenCard={setFullscreenCard}
                        onRowClick={handleRowClick}
                    />
                </div>
            )}

        </div>
        )
}

export default TableCardManager;