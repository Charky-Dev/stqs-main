import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Shipyard from "./Shipyard";

it("renders", async () => {
    // Arrange
    render(<Shipyard />);

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Mission Dashboard");
})