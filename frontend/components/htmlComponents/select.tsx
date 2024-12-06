import React from "react";

interface Option {
    value: string | number;
    description: string;
}

interface SelectProps {
    name: string; // Nome del campo
    options: Option[]; // Opzioni selezionabili
    value?: string | number; // Valore selezionato
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Callback per gestire i cambiamenti
    disabled?: boolean; // Se il select è disabilitato
}

const Select: React.FC<SelectProps> = ({
                                           name,
                                           options,
                                           value,
                                           onChange,
                                           disabled = false,
                                       }) => {
    return (
        <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        >

            {/* Opzioni dinamiche */}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.description}
                </option>
            ))}
        </select>
    );
};

export default Select;
