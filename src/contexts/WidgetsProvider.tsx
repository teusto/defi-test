import { useContext, createContext, useState, useEffect } from "react";

type favoriteCoin = {
    img: string
    url: string
}

const WidgetsContext = createContext();

const WidgetsProvider = ({ children }) => {
    const [favorites, setFavorites] = useState<favoriteCoin[]>([])

    const updateFavoritesList = (data: favoriteCoin[]) => {
        setFavorites([...favorites, data]);
    }

    const searchOnTheFavorites = (data) => {
        const found = favorites.find((element) => element.url);
        if (found) return true
    }

    useEffect(() => {
        console.log('Favorites mudou!', favorites)
    }, [favorites])
        
    return <WidgetsContext.Provider value={{favorites, updateFavoritesList, searchOnTheFavorites}}>{children}</WidgetsContext.Provider>;
};

export default WidgetsProvider;

export const useWidgets = () => {
    return useContext(WidgetsContext);
};