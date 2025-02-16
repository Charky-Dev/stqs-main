import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LogIn from "./LogIn";

it("renders", async () => {
    // Arrange
      const [agentToken, setAgentToken]= ["testToken", () => {return null}];
      const [authType, setAuthType] = ["Returning", () => {return null}];

    render(<LogIn setAuthType={setAuthType} agentToken={agentToken} setAgentToken={setAgentToken} />)

    // Act
    await screen.findAllByRole("heading");

    // Assert
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("SpaceTraders");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Returning User");
    expect(authType == "Returning");
})