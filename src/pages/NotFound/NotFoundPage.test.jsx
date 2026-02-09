import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
    test("renders the 404 message", () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", { name: /404 - page not found/i })
        ).toBeInTheDocument();
    });

    test("navigates back to Home when clicking return link", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={["/404"]}>
                <Routes>
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="/" element={<h1>Space Travel</h1>} />
                </Routes>
            </MemoryRouter>
        );

        await user.click(screen.getByRole("link", { name: /return to home/i }));

        expect(
            screen.getByRole("heading", { name: /space travel/i })
        ).toBeInTheDocument();
    });
});