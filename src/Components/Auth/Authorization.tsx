import { useState, useEffect } from "react"
import ReturningPlayer from "./ReturningPlayer";
import LogIn from "./LogIn";
import NewGame from "./NewGame";

function Authorization() {
  const [agentToken, setAgentToken] = useState("");
  const [accountToken, setAccountToken] = useState("");
  const [authType, setAuthType] = useState("New");

  useEffect(() => {
    const apiKey = localStorage.getItem('accountToken');
    if (apiKey) {
      setAccountToken(JSON.parse(apiKey));
    }

    const userKey = localStorage.getItem('agentToken');
    if (userKey) {
      setAgentToken(JSON.parse(userKey));
    }
  }, []);

  if (agentToken) {
    return (<ReturningPlayer agentToken={agentToken} />)
  }
  else if (authType == "Returning") {
    return (
      <LogIn setAuthType={setAuthType} agentToken={agentToken} setAgentToken={setAgentToken} />
    )
  }
  else {
    return (
      <NewGame accountToken={accountToken} setAuthType={setAuthType} agentToken={agentToken} setAgentToken={setAgentToken} />
    )
  }
}

export default Authorization