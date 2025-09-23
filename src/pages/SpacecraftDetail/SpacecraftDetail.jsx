import {useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./SpacecraftDetail.module.css";

export default function SpacecraftDetail() {
    const { id } = useParams();
    const [spacecraft, setSpacecraft] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SpaceTravelApi.getSpacecraftById(id)
            .then(setSpacecraft)
            .catch((err) => console.error("Failed to fetch spacecraft", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingSpinner />;

    if (!spacecraft) {
        return (
            <div className={styles["spacecraft-detail__error"]}>
                <p>Spacecraft not found.</p>
                <Link to="/spacecrafts">Back to Spacecrafts</Link>
            </div>
        );
    }

    return (
        <div className={styles["spacecraft-detail"]}>
            <h1 className={styles["spacecraft-detail__title"]}>{spacecraft.name}</h1>
            <p className={styles["spacecraft-detail__desc"]}>{spacecraft.description}</p>
            <p className={styles["spacecraft-detail__info"]}>{spacecraft.capacity}</p>
            <p className={styles["spacecraft-detail__info"]}>
                Stationed on Planet ID: {spacecraft.planetId}
            </p>

            <div className={styles["spacecraft-detail__actions"]}>
                <Link to="/spacecrafts">Back to All Spacecrafts</Link>
                <Link to="/planets">Dispatch to Another Planet</Link>
            </div>
        </div>
    );
}