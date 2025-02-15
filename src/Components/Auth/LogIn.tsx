import { useState, Dispatch, SetStateAction } from "react"
import { fetchAgentDetails } from "../ApiCalls"
import "../../assets/css/login.css"

interface PropTypes {
  setAuthType: Dispatch<SetStateAction<string>>;
  agentToken: string;
  setAgentToken: Dispatch<SetStateAction<string>>;
}

export default function LogIn({ agentToken, setAuthType, setAgentToken }: PropTypes) {

  const [returningUserForm, setReturningUserForm] = useState({ agentToken: agentToken });
  const [resp, setResp] = useState("");

  return (
    <div id="loginBox">
      <div id="loginForm">
        <div id="newGameHeader">
          <h1>SpaceTraders</h1>
          <h2>Returning User</h2>
        </div>
        <div>
          <input className="fullWidthButton" type="button" value="Start New Game" onClick={() => setAuthType("New")}></input>
          <br/>
          {/* input the player's Account key */}
          <label htmlFor="agentToken">Please enter your Agent token:</label>
          <span className="helpText" title="This can be geneerated in your account settings on httm://my.spacetraders.io/agents"> ? </span>
          <textarea className="keyInput" id="fullWidthButton" name="agentToken" value={returningUserForm.agentToken} onChange={(e) => setReturningUserForm({ ...returningUserForm, agentToken: e.currentTarget.value })} />

          <input className="fullWidthButton" type="submit" onClick={() => {
            fetchAgentDetails({ returningUserForm, setAgentToken, setResp });
          }} />
        </div>
        <div id="accountDetails">
          <pre>Response: {resp}</pre>
        </div>
      </div>
    </div>
  )
}