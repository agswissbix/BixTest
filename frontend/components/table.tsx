import React, {useState} from 'react';
import axiosInstance from "@/utils/axios";
import { useEffect } from 'react';

interface TableCompProps {
    tableid : string;
    onRowClick: (recordid: string) => void;  // Funzione per gestire il clic sulla riga
}


const TableComp: React.FC<TableCompProps> = ({ onRowClick, tableid }) => {
    const [tableRows, setTableRows] = useState([]);

    const getTableData = async () => {
        try {
            const response = await axiosInstance.post('records/get_table_data/', {tableid: tableid});
            console.log(response.data);
            setTableRows(response.data.table_rows);
        } catch (error) {
            console.error('Errore durante il caricamento dei dati', error);
        }
    }

    useEffect(() => {
        getTableData();
    }, []);

    return (
        <div className="w-full h-5/6">
            <div className="relative h-full w-full overflow-auto rounded-lg">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3">ID</th>
                </tr>
                </thead>
                <tbody>
                {tableRows.map((row) => (
                    <tr
                    key={row.recordid_}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    onClick={() => onRowClick(row.recordid_)}
                    >
                    {Object.keys(row).map((field, index) => (
                        <td key={index} className="px-6 py-3 whitespace-nowrap dark:text-white">
                        {row[field]}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default TableComp;
