// src/services/__tests__/SpaceTravelMockApi.test.js
import SpaceTravelMockApi from "../SpaceTravelMockApi";

describe("SpaceTravelMockApi persistence", () => {
    beforeEach(() => {
        SpaceTravelMockApi.reset();
    });

    test("creates a spacecraft and persists it to localStorage", async () => {
        const buildResponse = await SpaceTravelMockApi.buildSpacecraft({
            name: "Odyssey", 
            capacity: 100,
            description: "Vessel"
        });

        expect(buildResponse.isError).toBe(false);
        expect(buildResponse.data).toMatchObject({
            name: "Odyssey",
            capacity: 100,
            description: "Vessel",
            currentLocation: 2
        });

        const fetchResponse = await SpaceTravelMockApi.getSpacecrafts();

        expect(fetchResponse.isError).toBe(false);
        expect(fetchResponse.data).toContainEqual(buildResponse.data);
    })
})

// Prove data persistence logic works, LocalStorage usage is correct, and UI bugs aren't hiding data issues