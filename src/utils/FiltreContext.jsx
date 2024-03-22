import React, {createContext, useContext, useState} from 'react';

const FiltreContext = createContext();

export const FiltreProvider = ({children}) => {
    const [filtreOuvert, setFiltreOuvert] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");
    const [triageActive, setActiveTriage] = useState("");
    const [minPriceForThisCategory, setminPriceForThisCategory] = useState(0);
    const [maxPriceForThisCategory, setmaxPriceForThisCategory] = useState(0);
    const [filtreValider, setFiltreValider] = useState(false);

    const toggleFiltre = () => {
        setFiltreOuvert(!filtreOuvert);
    };

    return (
        <FiltreContext.Provider value={{
            filtreOuvert,
            toggleFiltre,
            activeCategory,
            setActiveCategory,
            triageActive,
            setActiveTriage,
            minPriceForThisCategory,
            setminPriceForThisCategory,
            maxPriceForThisCategory,
            setmaxPriceForThisCategory,
            setFiltreOuvert,
            setFiltreValider,
            filtreValider
        }}>
            {children}
        </FiltreContext.Provider>
    );
};

export const useFiltre = () => {
    const context = useContext(FiltreContext);
    if (!context) {
        throw new Error('useFiltre must be used within a FiltreProvider');
    }
    return context;
};
