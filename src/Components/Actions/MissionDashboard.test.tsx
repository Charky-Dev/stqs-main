import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MissionDashboard from "./MissionDashboard";

it("renders", async () => {
    // Arrange
    const agentToken = "testToken";
    render(<MissionDashboard agentToken={agentToken} />);

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Mission Dashboard");
})