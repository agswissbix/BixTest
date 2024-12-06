import React, { useState, useEffect } from 'react';
import { Home, Package, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import LoadingComp from './loading';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import axiosInstance from '../utils/axios';


interface Table {
    id: string;
    name: string;
}

interface Workspace {
    id: string;
    name: string;
    icon: string;
    order: number;
    tables: Table[];
}

interface SidebarProps {
    onChangeComponent: (componentType: string, tableid: string) => void;
}


const TableComp: React.FC<SidebarProps> = ({ onChangeComponent }) => {
    const [openDropdown, setOpenDropdown] = useState('');
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [sidebarData, setSidebarData] = useState<Workspace[]>([]);

    const getSidebarData = async () => {
        try {
            const response = await axiosInstance.get('records/get_sidebar_tables/');
            setSidebarData(response.data.workspaces);
        } catch (error) {
            console.error('Errore durante il caricamento dei dati', error);
        }
    }

    const handleMouseEnter = (section) => {
        setActiveTooltip(section);
    };

    const handleMouseLeave = () => {
        setActiveTooltip(null);
    };

    const loadSettings = () => {

    }

    useEffect(() => {
        getSidebarData();
    }, []);

    return (
        <div className="bg-gray-800 text-white h-screen
                    xl:w-64 w-16 transition-all duration-300">
            <ul className="list-none p-0 m-0">
                {sidebarData.map((workspace) => (
                    <li
                        key={workspace.id}
                        className="border-b border-gray-700 relative"
                        onMouseEnter={() => handleMouseEnter(workspace.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {workspace.tables ? (
                            // Dropdown section
                            <div>
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === workspace.id ? '' : workspace.id)}
                                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center min-w-[20px]">
                                        {/*<workspace.icon className="w-5 h-5 min-w-[20px]"/>*/}
                                        <span className="ml-3 xl:opacity-100 opacity-0 transition-opacity duration-300">
                      {workspace.name}
                    </span>
                                    </div>
                                    <span className="xl:block hidden">
                                      <ChevronDown
                                          className={`w-5 h-5 transition-transform duration-300 ${
                                              openDropdown === workspace.id ? '-rotate-180' : ''
                                          }`}
                                      />
                                    </span>

                                </button>

                                {/* Tooltip for mobile */}
                                {activeTooltip === workspace.id && (
                                    <div
                                        className="absolute left-full top-0 ml-2 bg-gray-700 rounded-md shadow-lg py-2 min-w-[160px] z-50 xl:hidden">
                                        <div className="px-4 py-2 font-semibold border-b border-gray-600">
                                            {workspace.name}
                                        </div>
                                        <ul className="py-1">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-600 transition-colors"
                                                >
                                                    Tabella
                                                </a>
                                            </li>
                                            {workspace.tables.map((table) => (
                                                <li key={table.id}>
                                                    <a
                                                        
                                                        className="block px-4 py-2 hover:bg-gray-600 transition-colors"
                                                    >
                                                        {table.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Dropdown menu for desktop */}
                                <div
                                    className={`xl:block hidden overflow-hidden transition-all duration-300 ease-in-out ${
                                        openDropdown === workspace.id ? 'max-h-dvh' : 'max-h-0'
                                    }`}
                                >
                                    <ul className="bg-gray-900 py-2">
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-12 py-2 hover:bg-gray-700 transition-colors"
                                                onClick={() => onChangeComponent('settings', '')}
                                            >
                                                Esempio componente custom
                                            </a>
                                        </li>
                                        {workspace.tables.map((table) => (
                                            <li key={table.id}>
                                                <a
                                                    className="block px-12 py-2 hover:bg-gray-700 transition-colors"
                                                    onClick={() => onChangeComponent('table', table.id)}                                              >
                                                    {table.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            // Regular link section
                            <a
                                className="flex items-center px-6 py-4 hover:bg-gray-700 transition-colors"
                            >
                                {/*<item.icon className="w-5 h-5 min-w-[20px]" />*/}
                                <span className="ml-3 xl:opacity-100 opacity-0 transition-opacity duration-300">
                  {workspace.name}
                </span>
                            </a>
                        )}

                        {/* Tooltip for regular items */}
                        {!workspace.tables && activeTooltip === workspace.id && (
                            <div className="absolute left-full top-0 ml-2 bg-gray-700 rounded-md shadow-lg py-2 px-4 whitespace-nowrap z-50 xl:hidden">
                                {workspace.name}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableComp;