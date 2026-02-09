import { useState } from "react";
import Button from "../Button/Button";
import styles from "./DispatchControl.module.css";

export default function DispatchControl({
    spacecraftId,
    currentPlanetId,
    planets, 
    onDispatch,
    dispatching = false
}) {
    const [selectedPlanetId, setSelectedPlanetId] = useState("");
    const isInvalidSelection = !selectedPlanetId || selectedPlanetId === currentPlanetId;

    const handleChange = (e) => {
        setSelectedPlanetId(Number(e.target.value));
    };

    const handleClick = () => {
        if (!selectedPlanetId) {
            alert ("Please select a destination planet.");
            return;
        }
        if (selectedPlanetId === currentPlanetId) {
            alert("Please select a different destination planet.");
            return;
        }
        onDispatch(spacecraftId, selectedPlanetId);
    };

    return (
        <div className={styles["dispatch-control"]}>
            <select 
                value={selectedPlanetId} 
                onChange={handleChange} 
                disabled={dispatching}
                className={styles["dispatch-control__select"]}
            >
                <option value="">Select destination</option>
                {planets
                    .filter((p) => p.id !== currentPlanetId)
                    .map((planet) => (
                        <option key={planet.id} value={planet.id}>
                            {planet.name}
                        </option>
                    ))}
            </select>
            <Button 
                onClick={handleClick} 
                disabled={dispatching || isInvalidSelection} 
                variant="primary"
            >
                {dispatching ? "Dispatching..." : "Dispatch"}
            </Button>
        </div>
    );
}