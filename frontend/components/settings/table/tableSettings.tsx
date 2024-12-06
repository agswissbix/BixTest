import React from 'react';
import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import FieldSettings from './fieldSettings';
import axiosInstance from '@/utils/axios';


function TableSettings() {
    const {tableid, userid, setFieldSettings, resetFieldSettings} = useSettingsStore();

    const getFieldSettings = async () => {
        try {
            const response = await axiosInstance.post('settings/get_table_fields/', {tableid});
            const tableFields = response.data.fields;
            setFieldSettings(<FieldSettings fields={tableFields} />);

        } catch (error) {
            console.error('Errore durante il salvataggio dell\'ordine delle tabelle', error);
        }
    }


    useEffect(() => {
        //window.alert(tableid);
        //window.alert(userid);
        return () => {
            resetFieldSettings();
        }
    }, [tableid, userid]);
    return (
        <div className="w-full">
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Impostazioni tabella    
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1" onClick={() => getFieldSettings()}>
                Impostazioni campi    
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Colonne in tabelle collegate
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi risultati ricerca
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi inserimento
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi ricerca    
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi visualizzazione    
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi badge
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi tabella export
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Campi kanban
            </button>
            <button className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default mb-1">
                Tabelle collegate
            </button>
        </div>
    );
};

export default TableSettings;
