import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Authorization from "./Authorization";

it("renders", async () => {
    // Arrange
    render(<Authorization />)

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("SpaceTraders");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent("New Game");
})