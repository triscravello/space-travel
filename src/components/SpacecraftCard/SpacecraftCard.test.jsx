import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SpacecraftCard from "./SpacecraftCard";

describe('SpacecraftCard', () => {
    test('calls decommission handler when button clicked', async () => {
        const user = userEvent.setup();
        const mockDecommission = vi.fn();

        render(
            <SpacecraftCard
                id={1}
                name="Voyager"
                capacity={80}
                onDelete={mockDecommission}
            />
        );

        await user.click(
            screen.getByRole('button', { name: /decommission/i })
        );

        expect(mockDecommission).toHaveBeenCalledTimes(1);
    });
})