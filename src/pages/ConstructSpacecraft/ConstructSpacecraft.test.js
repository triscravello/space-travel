import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ConstructSpacecraft from "./ConstructSpacecraft";
import SpaceTravelMockApi from "../../services/SpaceTravelMockApi";

// Mock navigation
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();

    // Kill artificial delay
    jest.spyOn(SpaceTravelMockApi, "wait").mockResolvedValue();
});

describe('ConstructSpacecraft', () => {
    test("builds spacecraft and navigates on success", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <ConstructSpacecraft />
            </MemoryRouter>
        );

        await user.type(
            screen.getByLabelText(/name/i),
            "Explorer One"
        );

        await user.type(
            screen.getByLabelText(/capacity/i),
            "120"
        );

        await user.type(
            screen.getByLabelText(/description/i),
            "Long-range exploration craft"
        );

        await user.click(
            screen.getByRole("button", { name: /build spacecraft/i })
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/spacecrafts")
        });

        // Assert DB side-effect
        const db = JSON.parse(localStorage.getItem("MOCK_DB"));
        const newShip = db.spacecrafts.find(
            (s) => s.name === "Explorer One"
        );

        expect(newShip).toBeDefined();
        expect(newShip.capacity).toBe(120);
        expect(newShip.currentLocation).toBe(2);
    });

    test("shows validation errors when fields are missing", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <ConstructSpacecraft />
            </MemoryRouter>
        );

        await user.click(
            screen.getByRole("button", { name: /build spacecraft/i })
        );

        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/capacity is required/i)).toBeInTheDocument();
        expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });
});

// Testing user interactions, form validation, async submit flow, persistence via localStorage, and navigation side effects    