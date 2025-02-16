import { useState, useEffect } from "react"
import ReturningPlayer from "../ReturningPlayer";
import LogIn from "./LogIn";
import NewGame from "./NewGame";

function Authorization() {
  const [agentToken, setAgentToken] = useState("");
  const [accountToken, setAccountToken] = useState("");
  const [authType, setAuthType] = useState("New");

  // Fetch any Account or Agent keys from storage
  useEffect(() => {
    const apiKey:string | null = localStorage.getItem('accountToken');
    if (apiKey) {
      setAccountToken(JSON.parse(apiKey));
    }

    const userKey:string | null  = sessionStorage.getItem('agentToken');
    if (userKey) {
      setAgentToken(JSON.parse(userKey));
    }
  }, []);

  if (agentToken) {
    // if there is a stored agent token (agent logged in)
    return (<ReturningPlayer agentToken={agentToken} />)
  }
  else if (authType == "Returning") {
    // if the user wishes to log in using an agent token
    return (
        <LogIn setAuthType={setAuthType} agentToken={agentToken} setAgentToken={setAgentToken} />
    )
  }
  else {
    // Show new user creation form
    return (
        <NewGame accountToken={accountToken} setAuthType={setAuthType} agentToken={agentToken} setAgentToken={setAgentToken} />
    )
  }
}

export default Authorization