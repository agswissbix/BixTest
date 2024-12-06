import Select from "@/components/htmlComponents/select"
import { Settings } from 'lucide-react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Droppable } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import axiosInstance from '@/utils/axios';
import { Toaster, toast } from 'sonner';

import CategoryType from "./categoryType";


interface FieldSettingsProps {
    fields : [];
}

interface Field {
    fieldid: string;
    description: string;
}



const FieldSettings: React.FC<FieldSettingsProps> = ({ fields }) => {

    const {tableid} = useSettingsStore();

    const [fieldid, setFieldid] = useState('');
    const [fielddescription, setFielddescription] = useState('');
    const [fieldtype, setFieldType] = useState('Parola');

    const {containerMultiUse, setContainerMultiUse} = useSettingsStore();


    const setCurrentFieldType = (fieldtype: string) => {
        if (fieldtype === 'Categoria') {
            setContainerMultiUse(<CategoryType />);
        }
        setFieldType(fieldtype);
    }
    


    const getFieldSettings = async () => {
        try {
            const response = await axiosInstance.post('settings/save_new_table_field/', {tableid, fieldid, fielddescription, fieldtype});
            toast.success('Campo salvato con successo');
        } catch (error) {
            console.error('Errore durante il salvataggio dell\'ordine delle tabelle', error);
        }
    }
    
    const saveNewField = async () => {
        try {
            const response = await axiosInstance.post('settings/save_new_table_field/', {tableid, fieldid, fielddescription, fieldtype});
            toast.success('Campo salvato con successo');
        } catch (error) {
            console.error('Errore durante il salvataggio dell\'ordine delle tabelle', error);
        }
    }

    return (
        <div className="h-full">
            <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex w-full h-0.5/6">
                <div className="w-5/6 p-1 flex">
                    <div className="w-2/6 p-1">
                        <label>ID</label>
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-bixcolor-light sm:text-sm/6" onChange={(e) => setFieldid(e.target.value)}></input>
                    </div>
                    <div className="w-2/6 p-1">
                        <label>Descrizione</label>
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-bixcolor-light sm:text-sm/6" onChange={(e) => setFielddescription(e.target.value)}></input>
                    </div>
                    <div className="w-2/6 p-1">
                        <label>Tipo</label> 
                        <select id="field-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700" onChange={(e) => setFieldType(e.target.value)}>
                            <option selected value="Parola">Parola</option>
                            <option value="Numero">Numero</option>
                            <option value="Utente">Utente</option>
                            <option value="Linked">Linked</option>
                            <option value="Data">Data</option>
                            <option value="Memo">Nota</option>
                            <option value="Categoria">Categoria</option>
                            <option value="LongText">LongText</option>
                            <option value="Checkbox">Checkbox</option>
                        </select>
                    </div>
                </div>
                <div className="w-1/6 relative">
                    <button className="w-full justify-center rounded-md bg-bixcolor-default text-sm/8 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default absolute top-1/2 transform -translate-y-1/2" onClick={() => {saveNewField()}}>
                        Salva
                    </button>
                </div>
            </div>
            <div className="z-10 top-0  transition-all duration-300 ease-out w-full cursor-default mx-auto p-2.5 mb-2 mt-2 flex-col w-full h-5/6 overflow-scroll">
                {fields.map((field: Field) => (
                    <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between">
                        <div className="w-8/12 h-full p-1">
                            <span>{field.description}</span>
                        </div>
                        <div className="w-4/12 h-full flex items-center justify-end space-x-2">
                            <button type="button" className="rounded-full text-gray-600 hover:text-gray-400 focus:text-gray-400" onClick={() => {getFieldSettings()}}>
                                <Settings />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FieldSettings;