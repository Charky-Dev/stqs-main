import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FleetManagement from "./FleetManagement";

it("renders", async () => {
    // Arrange
    render(<FleetManagement/>);

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Fleet Management");


})