import React from 'react';
import { createContext, useState, useContext } from "react";
import { DatesInfo, OptionsInfo } from "../models";

type Props = {
    children: JSX.Element;
}

interface DataContextType {
    destination: string;
    setDestination: React.Dispatch<React.SetStateAction<string>>;
    dates: DatesInfo[];
    setDates: React.Dispatch<React.SetStateAction<DatesInfo[]>>;
    options: OptionsInfo;
    setOptions: React.Dispatch<React.SetStateAction<OptionsInfo>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {
    const [destination, setDestination] = useState<string>("");
    const [dates, setDates] = useState<DatesInfo[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [options, setOptions] = useState<OptionsInfo>({
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