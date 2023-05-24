import { createContext, useState, useContext } from "react";
import React from 'react';

type Props = {
    children: JSX.Element;
}

interface DataContextType {
    destination: string;
    setDestination: React.Dispatch<React.SetStateAction<string>>;
    dates: {
        startDate: Date,
        endDate: Date,
        key: string
    }[]
    setDates: React.Dispatch<React.SetStateAction<{
        startDate: Date,
        endDate: Date,
        key: string
    }[]>>;
    options: {
        adult: number,
        children: number,
        room: number,
    }
    setOptions: React.Dispatch<React.SetStateAction<{
        adult: number,
        children: number,
        room: number,
    }>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {
    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    let value = { destination, setDestination, dates, setDates, options, setOptions };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export function useDataContext() {
    return useContext(DataContext);
}