import React, { useState } from 'react';
import { Home, Package, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import LoadingComp from './loading';
import $ from 'jquery';
import ReactDOM from 'react-dom';


const sidebarData = [
    {
        id: 'home',
        title: 'Home',
        icon: Home,
        href: '#'
    },
    {
        id: 'prodotti',
        title: 'Prodotti',
        icon: Package,
        subItems: [
            { id: 'cat1', title: 'Categoria 1', href: '#' },
            { id: 'cat2', title: 'Categoria 2', href: '#' },
            { id: 'cat3', title: 'Categoria 3', href: '#' },
            { id: 'cat4', title: 'Categoria 4', href: '#' }
        ]
    },
    {
        id: 'contatti',
        title: 'Contatti',
        icon: Mail,
        href: '#',
    }
];


interface SidebarProps {
    onChangeComponent: (component: string) => void;
}


const TableComp: React.FC<SidebarProps> = ({ onChangeComponent }) => {
    const [openDropdown, setOpenDropdown] = useState('');
    const [activeTooltip, setActiveTooltip] = useState(null);

    const handleMouseEnter = (section) => {
        setActiveTooltip(section);
    };

    const handleMouseLeave = () => {
        setActiveTooltip(null);
    };

    const loadSettings = () => {

    }

    return (
        <div className="bg-gray-800 text-white h-screen
                    xl:w-64 w-16 transition-all duration-300">
            <ul className="list-none p-0 m-0">
                {sidebarData.map((item) => (
                    <li
                        key={item.id}
                        className="border-b border-gray-700 relative"
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {item.subItems ? (
                            // Dropdown section
                            <div>
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === item.id ? '' : item.id)}
                                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center min-w-[20px]">
                                        <item.icon className="w-5 h-5 min-w-[20px]"/>
                                        <span className="ml-3 xl:opacity-100 opacity-0 transition-opacity duration-300">
                      {item.title}
                    </span>
                                    </div>
                                    <span className="xl:block hidden">
                                      <ChevronDown
                                          className={`w-5 h-5 transition-transform duration-300 ${
                                              openDropdown === item.id ? '-rotate-180' : ''
                                          }`}
                                      />
                                    </span>

                                </button>

                                {/* Tooltip for mobile */}
                                {activeTooltip === item.id && (
                                    <div
                                        className="absolute left-full top-0 ml-2 bg-gray-700 rounded-md shadow-lg py-2 min-w-[160px] z-50 xl:hidden">
                                        <div className="px-4 py-2 font-semibold border-b border-gray-600">
                                            {item.title}
                                        </div>
                                        <ul className="py-1">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.id}>
                                                    <a
                                                        href={subItem.href}
                                                        className="block px-4 py-2 hover:bg-gray-600 transition-colors"
                                                    >
                                                        {subItem.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Dropdown menu for desktop */}
                                <div
                                    className={`xl:block hidden overflow-hidden transition-all duration-300 ease-in-out ${
                                        openDropdown === item.id ? 'max-h-48' : 'max-h-0'
                                    }`}
                                >
                                    <ul className="bg-gray-900 py-2">
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.id}>
                                                <a
                                                    href={subItem.href}
                                                    className="block px-12 py-2 hover:bg-gray-700 transition-colors"
                                                    onClick={() => onChangeComponent('SettingsPage')}                                              >
                                                    {subItem.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            // Regular link section
                            <a
                                href={item.href}
                                className="flex items-center px-6 py-4 hover:bg-gray-700 transition-colors"
                            >
                                <item.icon className="w-5 h-5 min-w-[20px]" />
                                <span className="ml-3 xl:opacity-100 opacity-0 transition-opacity duration-300">
                  {item.title}
                </span>
                            </a>
                        )}

                        {/* Tooltip for regular items */}
                        {!item.subItems && activeTooltip === item.id && (
                            <div className="absolute left-full top-0 ml-2 bg-gray-700 rounded-md shadow-lg py-2 px-4 whitespace-nowrap z-50 xl:hidden">
                                {item.title}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableComp;