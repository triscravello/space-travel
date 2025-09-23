import { useEffect, useState } from "react";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./Planets.module.css";
import PlanetCard from "../../components/PlanetCard/PlanetCard";

export default function Planets() {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dispatchingId, setDispatchingId] = useState(null);

    const [dispatchTarget, setDispatchTarget] = useState({});

    useEffect(() => {
        fetchPlanets();
    }, []);

    const fetchPlanets = async () => {
        setLoading(true);
        try {
            const result = await SpaceTravelApi.getPlanets();

            // Use result.data instead of result
            if (Array.isArray(result.data)) {
                setPlanets(result.data);
            } else {
                console.error("Expected result.data to be an array", result.data);
                setPlanets([]); // fallback to empty array
            }
        } catch (err) {
            console.error("Failed to fetch planets:", err);
            setPlanets([]); // fallback to prevent crashes
        }
        setLoading(false);
    };

    const handleDispatchChange = (spacecraftId, planetId) => {
        setDispatchTarget((prev) => ({
            ...prev, 
            [spacecraftId]: planetId,
        }));
    };

    const handleDispatch = async (spacecraftId, currentPlanetId) => {
        const targetPlanetId = dispatchTarget[spacecraftId];
        if (!targetPlanetId || targetPlanetId === currentPlanetId) {
            alert ("Please select a different destination planet.");
            return;
        }

        setDispatchingId(spacecraftId);
        try {
            await SpaceTravelApi.sendSpacecraftToPlanet(spacecraftId, targetPlanetId);
            await fetchPlanets(); // Refresh list
        } catch (err) {
            console.error("Dispatch failed", err);
        } finally {
            setDispatchingId(null);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className={styles["planets-page"]}>
            <h1 className={styles["planets-page__title"]}>Planets & Stationed Spacecrafts</h1>

            {planets.map((planet) => (
                <PlanetCard
                    key={planet.id}
                    planet={planet}
                    allPlanets={planets}
                    onDispatch={handleDispatch}
                    dispatchingId={dispatchingId}
                />
            ))}
        </div>
    );
}