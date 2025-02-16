import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ReturningPlayer from "./ReturningPlayer";


it("renders", async () => {
    // Arrange
    const agentToken = "testAgentToken";
    render( (<ReturningPlayer agentToken={agentToken} />))

    // Act
    await screen.findAllByRole("heading");
    await screen.findAllByRole("button");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Space Traders");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Mission Dashboard");

})