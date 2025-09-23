import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage () {
    return (
        <div className={styles["not-found"]}>
            <h1 className={styles["not-found__title"]}>404 - Page Not Found</h1>
            <p className={styles["not-found__text"]}>
                The page you are looking for doesn't extist or has been moved. 
            </p>
            <Link to="/" className={styles["not-found__link"]}>
                Return to Home
            </Link>
        </div>
    );
}