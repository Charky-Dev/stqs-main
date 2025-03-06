import { useState, useEffect } from "react"

/**
 * This component is a basic MVP of part one of the quickstart. It handles registering your agent and receives a token
 * which you will need to use in subsequent calls. Therefore, you might want to refactor or replace this as you move forward.
 */

function NewGame() {
  const [agentToken, setAgentToken] = useState("");
  const [accountToken, setAccountToken] = useState("");
  const [resp, setResp] = useState("");

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

  const [form, setForm] = useState({ symbol: "", faction: "COSMIC", accountToken: accountToken });

  if (agentToken){
    return(
      <span>Welcome Back.</span>
    )
  }
  else{

  return (<>
    <h1>New Game</h1>

    {/* input for the player's name identifier */}
    <label htmlFor="symbol">Call Sign:</label>
    <input name="symbol" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })} />

    {/* input for the player's chosen faction */}
    <label htmlFor="faction">Faction:</label>
    <input name="faction" value={form.faction} onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })} />

    {
      accountToken ? null :
      <>
    {/* input the player's API key if required */}
    <br/>
    <label htmlFor="accountToken">Please enter your API Account token:</label>
    <input name="accountToken" value={form.accountToken} onChange={(e) => setForm({ ...form, accountToken: e.currentTarget.value })} />
    </>
  }
    <input type="submit" onClick={async () => {

      localStorage.setItem('accountToken', JSON.stringify(form.accountToken));

      const resp = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + form.accountToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: form.symbol,
          faction: form.faction,
        }),
      });

      const json = await resp.json();

      if (resp.ok) {
        setAgentToken(json.data.token)
      localStorage.setItem('agentToken', JSON.stringify(form.accountToken));

      }

      setResp(JSON.stringify(json, null, 2))
    }} />
    <pre>Account token: {agentToken}</pre>
    <pre>Agent token: {agentToken}</pre>
    <pre>Response: {resp}</pre>
  </>)
}
}

export default NewGame