import { Link } from 'react-router-dom';
import styles from './SpacecraftCard.module.css';

export default function SpacecraftCard({ id, name, description, capacity, planetId, onDelete }) {
    return (
        <div className={styles['spacecraft-card']}>
            <h2 className={styles['spacecraft-card__title']}>{name}</h2>
            <p className={styles['spacecraft-card__description']}>{description}</p>
            <p className={styles['spacecraft-card__info']}>Capacity: {capacity}</p>
            <p className={styles['spacecraft-card__info']}>Stationed on Planet ID: {planetId}</p>

            <div className={styles['spacecraft-card__actions']}>
                <Link to={`/spacecrafts/${id}`} className={styles['spacecraft-card__view']}>
                    View
                </Link>
                <button onClick={onDelete} className={styles['spacecraft-card__delete']}>
                    Decommission
                </button>
            </div>
        </div>
    );
}