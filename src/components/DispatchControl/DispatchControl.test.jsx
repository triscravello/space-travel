import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DispatchControl from "./DispatchControl";

test('dispatches spacecraft to another planet', async () => {
  const user = userEvent.setup();
  const onDispatch = vi.fn();

  const planets = [
    { id: 1, name: "Venus" },
    { id: 2, name: "Earth" },
    { id: 3, name: "Mars" }
  ];

  render(
    <DispatchControl
        spacecraftId={42}
        currentPlanetId={1}
        planets={planets}
        onDispatch={onDispatch}
    />
  );

  await user.selectOptions(
    screen.getByRole("combobox"),
    "3" // Mars's ID
  );

  await user.click(
    screen.getByRole('button', { name: /dispatch/i })
  );

  expect(onDispatch).toHaveBeenCalledWith(42, 3);
});

// Tests behavior, uses accessible queries, verifies side effects