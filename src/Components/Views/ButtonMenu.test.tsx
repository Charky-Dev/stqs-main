import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ButtonMenu from "./ButtonMenu";

it("renders", async () => {
    // Arrange
    const [currentView, setCurrentView] = ["Mission Dashboard", () => {return null}];
    render(<ButtonMenu currentView={currentView} setCurrentView={setCurrentView} />)

    // Act
    await screen.findAllByRole("button");

    // Assert
    expect(screen.getAllByRole("button").length >= 2);
})