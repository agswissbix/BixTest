// src/store.ts
import { create } from 'zustand'

interface SettingsStore {

    userid : string;
    setUserid: (userid: string) => void
    resetUserid: () => void;

    tableid : string;
    setTableid: (tableid: string) => void;
    resetTableid: () => void;

    tableSettings: React.ReactNode | null;
    setTableSettings: (component: React.ReactNode | null) => void;
    resetTableSettings: () => void;

    fieldSettings : React.ReactNode | null;
    setFieldSettings: (component: React.ReactNode | null) => void;
    resetFieldSettings: () => void;

    fieldOptions: React.ReactNode | null;
    setFieldOptions: (component: React.ReactNode | null) => void;
    resetFieldOptions: () => void;

    containerMultiUse: React.ReactNode | null;
    setContainerMultiUse: (component: React.ReactNode | null) => void;
    resetContainerMultiUse: () => void;

    
}

export const useSettingsStore = create<SettingsStore>((set) => ({

    userid: '',
    setUserid: (userid: string) => set({ userid }),
    resetUserid: () => set({ userid: '' }),

    tableid: '',
    setTableid: (tableid: string) => set({ tableid }),
    resetTableid: () => set({ tableid: '' }),

    tableSettings: null,
    setTableSettings: (component: React.ReactNode | null) => set({ tableSettings: component }),
    resetTableSettings: () => set({ tableSettings: null }),

    fieldSettings: null,
    setFieldSettings: (component: React.ReactNode | null) => set({ fieldSettings: component }),
    resetFieldSettings: () => set({ fieldSettings: null }),

    fieldOptions: null,
    setFieldOptions: (component: React.ReactNode | null) => set({ fieldOptions: component }),
    resetFieldOptions: () => set({ fieldOptions: null }),

    containerMultiUse: null,
    setContainerMultiUse: (component: React.ReactNode | null) => set({ containerMultiUse: component }),
    resetContainerMultiUse: () => set({ containerMultiUse: null }),


}));
