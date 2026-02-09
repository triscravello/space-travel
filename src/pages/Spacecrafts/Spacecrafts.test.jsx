import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import SpacecraftsPage from "./Spacecrafts";
import SpaceTravelApi from "../../services/SpaceTravelApi";

vi.mock("../../services/SpaceTravelApi", () => ({
    default: {
        getSpacecrafts: vi.fn(),
        destroySpacecraftById: vi.fn()
    }
}));

test("shows loading spinner while spacecrafts are being fetched", () => {
    SpaceTravelApi.getSpacecrafts.mockReturnValue(new Promise(() => {}));

    render(
        <MemoryRouter>
            <SpacecraftsPage />
        </MemoryRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});

test('renders "No spacecraft available" when no spacecrafts exist', async () => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ data: [] });

    render(
        <MemoryRouter>
            <SpacecraftsPage />
        </MemoryRouter>
    );

    expect(await screen.findByText("No spacecraft available")).toBeInTheDocument();
});