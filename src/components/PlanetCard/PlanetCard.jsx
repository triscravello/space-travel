import DispatchControl from "../DispatchControl/DispatchControl";
import styles from "./PlanetCard.module.css";

/**
 * @param {Object} planet - Planet object (with .id, .name, .spacecrafts)
 * @param {Array} allPlanets - All available planets (for dispatch dropdown)
 * @param {Function} onDispatch - Callback to handle dispatching a spacecraft
 * @param {String|null} dispatchingId - ID of the spacecraft currently dispatching
 */

export default function PlanetCard ({ planet, allPlanets, onDispatch, dispatchingId}) {
    // Ensure spacecrafts is an array to avoid errors
    const spacecrafts = Array.isArray(planet.spacecrafts) ? planet.spacecrafts : [];
    
    return (
        <div className={styles["planet-card"]}>
            <h2 className={styles["planet-card__title"]}>{planet.name}</h2>

            {spacecrafts.length === 0 ? (
                <p className={styles["planet-card__empty"]}>No Spacecraft stationed here.</p>
            ) : (
                <ul className={styles["planet-card__list"]}>
                    {spacecrafts.map((spacecraft) => (
                        <li key={spacecraft.id} className={styles["spacecraft-entry"]}>
                            <div className={styles["spacecraft-entry__info"]}>
                                <strong>{spacecraft.name}</strong> - Capacity: {spacecraft.capacity}
                            </div>

                            <div className={styles["spacecraft-entry__dispatch"]}>
                                <DispatchControl
                                    spacecraftId={spacecraft.id}
                                    currentPlanetId={planet.id}
                                    planets={allPlanets}
                                    onDispatch={onDispatch}
                                    disabled={dispatchingId !== null}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )} 
        </div>
    );      
}