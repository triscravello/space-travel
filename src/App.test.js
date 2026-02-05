// /src/App.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from './App';

const renderWithRouter = (initialRoute = "/") => {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <App />
        </MemoryRouter>
    );
};

describe('Space Travel App', () => {
    test('renders Home page on initial load', () => {
        renderWithRouter('/');

        expect(
            screen.getByRole('heading', { name: /space travel/i })
        ).toBeInTheDocument();
    });

    test('navigates to Spacecrafts page via header link', async () => {
        const user = userEvent.setup();
        renderWithRouter('/');

        const spacecraftLink = screen.getByRole('link', { name: /spacecrafts/i });
        await user.click(spacecraftLink);

        expect(
            screen.getByRole('heading', { name: /spacecrafts/i })
        ).toBeInTheDocument();
    });

    test('redirects to home for unknown routes', () => {
        renderWithRouter('/some/fake/route');

        expect(
            screen.getByRole('heading', { name: /space travel/i })
        ).toBeInTheDocument();
    });
});