import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header () {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__logo}>Space Travel</h1>
            <nav className={styles.header__nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => 
                        isActive ? styles["header__link--active"] : styles.header__link
                    }
                    end
                >
                    Home
                </NavLink>
                <NavLink
                    to="/planets"
                    className={({ isActive }) => 
                        isActive ? styles["header__link--active"] : styles.header__link
                    }
                >
                    Planets
                </NavLink>
                <NavLink
                    to="/spacecrafts"
                    className={({ isActive }) => 
                        isActive ? styles["header__link--active"] : styles.header__link
                    }
                >
                    Spacecrafts
                </NavLink>
                <NavLink
                    to="/spacecrafts/new"
                    className={({ isActive }) => 
                        isActive ? styles["header__link--active"] : styles.header__link
                    }
                >
                    Construct Spacecraft
                </NavLink>
            </nav>
        </header>
    );
}