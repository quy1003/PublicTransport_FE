import React, { createContext, useState } from 'react';

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
    const [selectedBus, setSelectedBus] = useState([]);

    return (
        <BusContext.Provider value={{ selectedBus, setSelectedBus }}>
            {children}
        </BusContext.Provider>
    );
};
