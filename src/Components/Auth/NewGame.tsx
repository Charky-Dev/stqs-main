import { useState, Dispatch, SetStateAction } from "react"
import { fetchNewAgent } from "../ApiCalls"
import "../../assets/css/login.css"

interface PropTypes {
    setAuthType: Dispatch<SetStateAction<string>>;
    accountToken: string;
    agentToken: string;
    setAgentToken: Dispatch<SetStateAction<string>>;
}

export default function NewGame({ setAuthType, accountToken, agentToken, setAgentToken }: PropTypes) {

    // Outline required information for New User form
    const [newUserForm, setNewUserForm] = useState({ symbol: "", faction: "COSMIC", accountToken: accountToken });

    //Store response to user creation request
    const [resp, setResp] = useState("");

    return (
        <div id="loginBox">

            <div id="loginForm">
                <div id="newGameHeader">
                <h1>SpaceTraders</h1>
                    <h2>New Game</h2>
                </div>
                <div>
                    {/* Allow user to log in using token from account */}
                    <input type="button" className="fullWidthButton" value="Log in instead" onClick={() => setAuthType("Returning")}></input>
                    <br/>
                    {/* input for the player's name identifier */}
                    <label htmlFor="symbol">Call Sign:</label>&nbsp;
                    <input name="symbol" value={newUserForm.symbol} onChange={(e) => setNewUserForm({ ...newUserForm, symbol: e.currentTarget.value })} />
                    <span className="helpText" title="This is your character's unique identifier"> ? </span>
                    <br/>
                    {/* input for the player's chosen faction */}
                    <label htmlFor="faction">Faction:</label>&nbsp;
                    <input name="faction" value={newUserForm.faction} onChange={(e) => setNewUserForm({ ...newUserForm, faction: e.currentTarget.value })} />
                    <span className="helpText" title="If you aren't sure, this can be left as COSMIC"> ? </span>
                    {/* only show account token box if this is not already stored */}
                    {
                        accountToken ? null :
                            <>
                                {/* input the player's API key if required */}
                                <br />
                                <label htmlFor="accountToken">Please enter your API Account token:</label> 
                                <span className="helpText" title="This can be found in your account settings on httm://my.spacetraders.io/settings"> ? </span>
                                <br/>
                                <textarea className="keyInput" name="accountToken" value={newUserForm.accountToken} onChange={(e) => setNewUserForm({ ...newUserForm, accountToken: e.currentTarget.value })} />
                            </>
                    }
                    <br/>
                    <input type="submit" className="fullWidthButton" onClick={() => {
                        // send api request and fetch new user details
                        fetchNewAgent({ newUserForm, setAgentToken, setResp });
                    }} />
                </div>
                <div id="accountDetails">
                    <pre>Response: {resp}</pre>
                </div>
            </div>
        </div>
    )
}