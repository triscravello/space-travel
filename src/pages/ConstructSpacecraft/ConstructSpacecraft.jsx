import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./ConstructSpacecraft.module.css";

export default function ConstructSpacecraft() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        capacity: "",
        description: "",
    });

    const [error, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.capacity.trim()) newErrors.capacity = "Capacity is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            await SpaceTravelApi.buildSpacecraft({
                ...form,
                capacity: Number(form.capacity),
            });
            navigate("/spacecrafts");
        } catch (err) {
            console.error("Failed to create spacecraft", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles["construct-page"]}>
            <h1 className={styles["construct-page__title"]}>Build a New Spacecraft</h1>
            
            <form onSubmit={handleSubmit} className={styles["construct-form"]}>
                <div className={styles["construct-form__field"]}>
                    <label htmlFor="name">Name</label>
                    <input 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        disabled={submitting}
                    />
                    {error.name && <span className={styles["construct-form__error"]}>{error.name}</span>}
                </div>

                <div className={styles["construct-form__field"]}>
                    <label htmlFor="capacity">Capacity</label>
                    <input 
                        name="capacity" 
                        value={form.capacity} 
                        onChange={handleChange} 
                        disabled={submitting}
                    />
                    {error.capacity && <span className={styles["construct-form__error"]}>{error.capacity}</span>}
                </div>

                <div className={styles["construct-form__field"]}>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        name="description" 
                        value={form.description} 
                        onChange={handleChange} 
                        disabled={submitting}
                    />
                    {error.description && <span className={styles["construct-form__error"]}>{error.description}</span>}
                </div>

                <div className={styles["construct-form__actions"]}>
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Building..." : "Build Spacecraft"}
                    </button>
                    <Link to="/spacecrafts" className={styles["construct-form__cancel"]}>
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}