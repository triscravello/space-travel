import styles from "./Button.module.css";
import classNames from "classnames";

/**
 * Reusable button component
 * @param {string} type - button type ("button", "submit")
 * @param {function} onClick - click handler
 * @param {boolean} disabled - disable the button
 * @param {string} variant - "primary" | "secondary" | "danger"
 * @param {string} className - additional class names
 * @param {ReactNode} children - button content
 */

export default function Button({
    type = "button",
    onClick,
    disabled = false,
    variant = "primary",
    className = "",
    children,
}) {
    const btnClass = classNames(
        styles["button"],
        styles[`button--${variant}`],
        className
    );

    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled} 
            className={btnClass}
        >
            {children}
        </button>
    );
}