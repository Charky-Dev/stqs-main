import { useState, type Dispatch, type SetStateAction } from "react"
import { fetchNewAgent } from "../../../Utils/Api/ApiHandlingPlayer";
import "../../../Assets/css/login.css"

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
                    <input type="button" className="logInButton" value="Log in instead" onClick={() => setAuthType("Returning")}></input>
                    <br />
                    {/* input for the player's name identifier */}
                    <label htmlFor="symbol">Call Sign:</label>&nbsp;
                    <input name="symbol" value={newUserForm.symbol} pattern="[A-Za-z0-9_\-]{3,12}" minLength={3} maxLength={12} onChange={(e) => setNewUserForm({ ...newUserForm, symbol: e.currentTarget.value })} />
                    <span className="helpText" title="This is your character's unique identifier"> ? </span>
                    <br />
                    {/* input for the player's chosen faction */}
                    <label htmlFor="faction">Faction:</label>&nbsp;
                    <input name="faction" value={newUserForm.faction} pattern="[A-Za-z ]{0,30}" type="text" maxLength={30} onChange={(e) => setNewUserForm({ ...newUserForm, faction: e.currentTarget.value })} />
                    <span className="helpText" title="If you aren't sure, this can be left as COSMIC"> ? </span>
                    {/* only show account token box if this is not already stored */}
                    {
                        accountToken ? null :
                            <>
                                {/* input the player's API key if required */}
                                <br />
                                <label htmlFor="accountToken">Please enter your API Account token:</label>
                                <span className="helpText" title="This can be found in your account settings on httm://my.spacetraders.io/settings"> ? </span>
                                <br />
                                <textarea className="keyInput" name="accountToken" value={newUserForm.accountToken} minLength={500} maxLength={550} onChange={(e) => setNewUserForm({ ...newUserForm, accountToken: e.currentTarget.value })} />
                            </>
                    }
                    <br />
                    <input type="submit" className="logInButton" onClick={() => {
                        // send api request and fetch new user details
                        const agentRegex = /[A-Za-z0-9_-]{3,12}/;
                        const factionRegex = /[A-Za-z ]{0,30}/;
                        const tokenRegex = /[A-Za-z0-9.\-_]{500,550}/;

                        if (!newUserForm.symbol.match(agentRegex)) {
                            const errorBody = "{ \"error\": { \"message\": \"user agent should only contain letters, numbers, hyphens, underscores and full stops\"}}";
                            const errorSettings = { status: 400, statusText:  "user agent should only contain letters, numbers, hyphens, underscores and full stops"};
                            const errorResponse = new Response(errorBody, errorSettings);
                            setResp(JSON.stringify(errorResponse.statusText, null, 2));
                        }
                        else if (!newUserForm.faction.match(factionRegex)) {
                            const errorBody = "{ \"error\": { \"message\": \"faction should only contain letters and spaces\"}}";
                            const errorSettings = { status: 400, statusText: "faction should only contain letters and spaces" };
                            const errorResponse = new Response(errorBody, errorSettings);
                            setResp(JSON.stringify(errorResponse.statusText, null, 2));
                        }
                        else if (!newUserForm.accountToken.match(tokenRegex)) {
                            const errorBody = "{ \"error\": { \"message\": \"token should only contain letters and numbers\"}}";
                            const errorSettings = { status: 400, statusText:  "token should only contain letters and numbers"};
                            const errorResponse = new Response(errorBody, errorSettings);
                            setResp(JSON.stringify(errorResponse.statusText, null, 2));
                        }
                        else {
                            fetchNewAgent({ newUserForm, setAgentToken, setResp });
                        }
                    }} />
                </div>
                <div id="accountDetails">
                    <pre>Response: {resp}</pre>
                    <pre>Token: {agentToken}</pre>
                </div>
            </div>
        </div>
    )
}