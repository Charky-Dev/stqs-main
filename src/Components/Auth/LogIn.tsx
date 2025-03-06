import { useState, Dispatch, SetStateAction } from "react"

interface PropTypes {
  setAuthType: Dispatch<SetStateAction<string>>;
  agentToken: string;
  setAgentToken: Dispatch<SetStateAction<string>>;
}

export default function LogIn({ agentToken, setAuthType, setAgentToken }: PropTypes) {

  const [returningUserForm, setReturningUserForm] = useState({ agentToken: agentToken });
  const [resp, setResp] = useState("");

  return (
    <>
      <h2>Returning User</h2>
      <input type="button" value="Start New Game" onClick={() => setAuthType("New")}></input>

      {/* input the player's Account key */}
      <label htmlFor="agentToken">Please enter your Agent token:</label>
      <input name="agentToken" value={returningUserForm.agentToken} onChange={(e) => setReturningUserForm({ ...returningUserForm, agentToken: e.currentTarget.value })} />

      <input type="submit" onClick={async () => {

        sessionStorage.setItem('agentToken', JSON.stringify(returningUserForm.agentToken));

        const resp = await fetch("https://api.spacetraders.io/v2/my/agent", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + returningUserForm.agentToken,
            "Content-Type": "application/json",
          },
        });

        const json = await resp.json();

        if (resp.ok) {
          setResp(JSON.stringify(json, null, 2));
          setAgentToken(returningUserForm.agentToken);
        }

      }} />
      <pre>Agent token: {agentToken}</pre>
      <pre>Response: {resp}</pre>
    </>
  )
}