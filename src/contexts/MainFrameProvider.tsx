import { useContext, createContext, useState, useEffect } from "react";

const MainFrameContext = createContext();

const MainFrameProvider = ({ children }) => {
    const [dataToList, setDataToList] = useState(null)
    const [dataToChart, setDataToChart] = useState([])

    const update = (data, chartData) => {
        console.log({chartData})
        setDataToList(data);
        setDataToChart(chartData)
    }
        
    return <MainFrameContext.Provider value={{dataToList, update, dataToChart}}>{children}</MainFrameContext.Provider>;
};

export default MainFrameProvider;

export const useMainFrame = () => {
    return useContext(MainFrameContext);
};