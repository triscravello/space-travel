import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpaceTravelProvider, useSpaceTravel } from "../SpaceTravelContext";
import SpaceTravelApi from "../../services/SpaceTravelApi";

jest.mock("../services/SpaceTravelApi", () => ({
    __esModule: true,
    default: {
        getSpacecrafts: jest.fn(),
        getPlanets: jest.fn(),
    },
}));

function TestConsumer() {
    const { spacecrafts, planets, loading, refreshSpacecrafts } = useSpaceTravel();

    return(
        <div>
            <div data-testid="child-content">Provider child rendered</div>
            <div data-testid="loading">{String(loading)}</div>
            <div data-testid="spacecraft-control">{spacecrafts.length}</div>
            <div data-testid="planet-count">{planets.length}</div>
            <button onClick={refreshSpacecrafts}>refresh spacecrafts</button>
        </div>
    );
}

describe("SpaceTravelProvider", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders children and provides loaded data to consumers", async() => {
        SpaceTravelApi.getSpacecrafts.mockResolvedValueOnce([{ id: "s1", name: "Explorer" }]);
        SpaceTravelApi.getPlanets.mockResolvedValueOnce([{ id: 1, name: "Mars" }]);

        render(
            <SpaceTravelProvider>
                <TestConsumer />
            </SpaceTravelProvider>
        );

        expect(screen.getByTestId("child-content")).toBeInTheDocument();
        expect(screen.getAllByTestId("loading").toHaveTextContent("true"));

        await waitFor(() => {
            expect(screen.getByTestId("loading")).toHaveTextContent("false");
        });

        expect(screen.getByTestId("spacecraft-count")).toHaveTextContent("1");
        expect(screen.getAllByTestId("planet-count")).toHaveTextContent("2");
    });

    test("refreshSpacecrafts updates spacecraft state", async () => {
        const user = userEvent.setup();

        SpaceTravelApi.getSpacecrafts
            .mockResolvedValueOnce([{ id: "s1", name: "Explorer"}])
            .mockResolvedValueOnce([
                { id: "s1", name: "Explorer" },
                { id: "s2", name: "Voyager" }
            ]);
        SpaceTravelApi.getPlanets.mockResolvedValueOnce([{ id: 1, name: "Mars" }]);

        render(
            <SpaceTravelProvider>
                <TestConsumer />
            </SpaceTravelProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("spacecraft-count")).toHaveTextContent("1");
        });

        await user.clock(screen.getByRole("button", { name: /refresh spacecrafts/i }));

        await waitFor(() => {
            expect(screen.getByTestId("spacecraft-count")).toHaveTextContent("2");
        });
    });
});