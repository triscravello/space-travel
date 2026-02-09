import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import SpacecraftCard from "../../components/SpacecraftCard/SpacecraftCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from './Spacecrafts.module.css';

export default function SpacecraftsPage() {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SpaceTravelApi.getSpacecrafts()
            .then((result) => {
                if (Array.isArray(result.data)) {
                    setSpacecrafts(result.data);
                } else {
                    console.error('Unexpected spacecraft response:', result);
                    setSpacecrafts([]);
                }
            })
            .catch((err) => {
                console.error('Error fetching spacecrafts:', err);
                setSpacecrafts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to decomission this spacecraft?');
        if (!confirm) return;

        await SpaceTravelApi.destroySpacecraftById(id);
        setSpacecrafts(prev => prev.filter(sc => sc.id !== id));
    };

    return (
        <div className={styles['spacecrafts-page']}>
            <div className={styles['spacecrafts-page__header']}>
                <h1 className={styles['spacecrafts-page__title']}>All Spacecrafts</h1>
                <Link to="/spacecrafts/new" className={styles['spacecrafts-page__new-button']}>
                    + Build New Spacecraft
                </Link>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles['spacecrafts-page__list']}>
                    {spacecrafts.length === 0 ? (
                        <p className={styles['spacecrafts-page__empty']}>No Spacecraft available</p>
                    ): (
                        spacecrafts.map((spacecraft) => (
                            <SpacecraftCard 
                                key={spacecraft.id} 
                                id={spacecraft.id} 
                                name={spacecraft.name} 
                                description={spacecraft.description}
                                capacity={spacecraft.capacity}
                                planetId={spacecraft.planetId}
                                onDelete={() => handleDelete(spacecraft.id)}
                            />
                        ))
                    )}
                </div>
            )}

            <div className={styles['spacecrafts-page__footer']}>
                <Link to="/">Back to Home</Link>
                <Link to="/planets">View Planets</Link>
            </div>
        </div>
    );
}