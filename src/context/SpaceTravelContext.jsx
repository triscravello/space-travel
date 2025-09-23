import { createContext, useContext, useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

const SpaceTravelContext = createContext();

export function SpaceTravelProvider({ children }) {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    //Load initial data
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [spacecraftsData, planetsData] = await Promise.all ([
                SpaceTravelApi.getSpacecrafts(),
                SpaceTravelApi.getPlanets(),
            ]);
            setSpacecrafts(spacecraftsData);
            setPlanets(planetsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshSpacecrafts = async () => {
        const updated = await SpaceTravelApi.getSpacecrafts();
        setSpacecrafts(updated);
    };

    const refreshPlanets = async () => {
        const updated = await SpaceTravelApi.getPlanets();
        setPlanets(updated);
    };

    return (
        <SpaceTravelContext.Provider
            value={{
                spacecrafts,
                planets,
                loading,
                refreshSpacecrafts,
                refreshPlanets,
            }}
        >
            {children}
        </SpaceTravelContext.Provider>
    );
}

// Custom hook to use the context
export function useSpaceTravel() {
    const context = useContext(SpaceTravelContext);
    if (!context) {
        throw new Error ("useSpaceTravel must be used within a SpaceTravelProvider");  
    }
    return context;
}