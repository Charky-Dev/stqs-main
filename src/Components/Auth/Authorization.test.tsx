import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Authorization from "./Authorization";

it("renders", async () => {
    // Arrange
    render(<Authorization />)

    // Act
    await screen.findByRole("heading");

    // Assert
    expect(screen.getByRole("heading")).toHaveTextContent("New Game");
})