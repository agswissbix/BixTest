import { CircleX } from 'lucide-react';

interface CardCompProps {
    openCards: number[];
    closingCard: number | null;
    onCloseCard: (id: number) => void;
}

const CardComp: React.FC<CardCompProps> = ({ openCards, closingCard, onCloseCard }) => {
    const tablerows = [
        {
            id: 1,
            title: "Apple MacBook Pro 17",
            description: "MacBook Pro 17"
        },
        {
            id: 2,
            title: "Microsoft Surface Pro",
            description: "Surface Pro 2"
        },
        {
            id: 3,
            title: "Magic Mouse 2",
            description: "Magic Mouse 2"
        }
    ];


    return (
        <div className="relative w-full h-full flex justify-center items-end">
            {openCards.map((id, index) => {
                const item = tablerows.find(d => d.id === id);
                const isClosing = id === closingCard;

                return (
                    <div
                        key={id}
                        className={`absolute top-0 bg-white rounded-lg shadow-xl transition-all duration-300 ease-out border border-gray-300 w-full h-full cursor-default ${isClosing ? 'transform translate-x-16 opacity-0' : ''}`}
                        style={{
                            transform: `translateX(${index * -30}px) translateY(${index * 15}px) rotate(${index * -2}deg)`,
                            zIndex: openCards.length - index,
                        }}
                    >
                        <div className="p-6 relative">
                            <div onClick={() => onCloseCard(id)}
                                 className="static float-right cursor-pointer top-2 right-2 w-6 h-6 flex items-center justify-center transition-colors ">
                                <CircleX className="w-4 h-4 text-red-500 hover:text-red-700"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{item?.title}</h3>
                            <p className="text-gray-600 text-base mt-2">{item?.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardComp;
