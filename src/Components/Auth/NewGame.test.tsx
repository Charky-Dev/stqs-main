import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NewGame from "./NewGame";

it("renders", async () => {
    // Arrange
    const accountToken = "testAccountToken";
    const [agentToken, setAgentToken] = ["", () => {return null}];
    const [authType, setAuthType] = ["New", () => {return null}];

    render(<NewGame accountToken={accountToken} setAuthType={setAuthType} agentToken={agentToken} setAgentToken={setAgentToken} />
    )

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("SpaceTraders");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent("New Game");
    expect(authType == "New");
})