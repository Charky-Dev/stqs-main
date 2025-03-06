import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

it("renders", async () => {
    // Arrange
    render(<Navigation />);

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Local Waypoints");
})