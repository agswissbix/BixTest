// components/ComponentA.tsx
import React, {useEffect} from 'react';
import {useState} from "react";
import Select from '../components/htmlComponents/select';
import { Suspense } from 'react';
import LoadingComp from "@/components/loading";
import axiosInstance from "@/utils/axios";
import dynamic from "next/dynamic";
import TableSettings from '@/components/settings/table/tableSettings';
import FieldSettings from '@/components/settings/table/fieldSettings';
import TestTablesList from '@/components/settings/table/testTableList';
import { useSettingsStore } from '@/stores/settingsStore';

    
const SettingsPage: React.FC = () => {

    const [usersList, setUsersList] = useState([]);
    const [workspacesTables, setworkspacesTables] = useState([]);
    
    const {setUserid, userid, resetUserid} = useSettingsStore();

    const {tableSettings} = useSettingsStore(); 
    const {resetTableSettings} = useSettingsStore();

    const {fieldSettings} = useSettingsStore();
    const {resetFieldSettings} = useSettingsStore();

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUser = e.target.value;
        try {
            setUserid(selectedUser);
            getWorkspacesTables(selectedUser); // Passa il valore direttamente
        } catch (error) {
            console.error('Errore durante il cambio utente', error);
        }
    };

    const getWorkspacesTables = async (userid : string) => {
        try {
            const response = await axiosInstance.post('settings/get_workspaces_tables/', {user: userid});
            setworkspacesTables(response.data.workspaces);
            console.info(response.data.workspaces);
            resetTableSettings();
            resetFieldSettings();
        } catch (error) {
            console.error('Errore durante il recupero della lista workspaces', error);
        }
    }

    const getUsersList = async () => {
        try {
            const response = await axiosInstance.post('settings/get_users_list/');
            setUsersList(response.data.users);
            console.info(response.data.users);
        } catch (error) {
            console.error('Errore durante il recupero della lista utenti', error);
        }
    };  

    useEffect(() => {
        resetUserid();
        getUsersList();
        return () => {
            resetTableSettings();
            resetFieldSettings();
          };
    }, []);

    return (
        <div className="w-full h-full flex">
            <div className="w-1/5 h-full p-2.5">
                <Select
                    name="select-user"
                    options={usersList}
                    value={userid}   
                    onChange={handleUserChange}
                />
            </div>
            <div className="w-1/5 h-full p-2.5">

                <TestTablesList workspaces={workspacesTables} />
            </div>
            <div className="w-1/5 h-full p-2.5">
                {tableSettings}
            </div>
            <div className="w-1/5 h-full p-2.5">
                {fieldSettings}
            </div>
            <div className="w-1/5 h-full p-2.5"></div>
        </div>
    );
};

export default SettingsPage;
