import { useState, Dispatch, SetStateAction } from "react"
import {fetchNewAgent} from "../ApiCalls"

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
        <>
            <h1>New Game</h1>

            {/* Allow user to log in using token from account */}
            <input type="button" value="Log in instead" onClick={() => setAuthType("Returning")}></input>

            {/* input for the player's name identifier */}
            <label htmlFor="symbol">Call Sign:</label>
            <input name="symbol" value={newUserForm.symbol} onChange={(e) => setNewUserForm({ ...newUserForm, symbol: e.currentTarget.value })} />

            {/* input for the player's chosen faction */}
            <label htmlFor="faction">Faction:</label>
            <input name="faction" value={newUserForm.faction} onChange={(e) => setNewUserForm({ ...newUserForm, faction: e.currentTarget.value })} />

            {/* only show account token box if this is not already stored */}
            {
                accountToken ? null :
                    <>
                        {/* input the player's API key if required */}
                        <br />
                        <label htmlFor="accountToken">Please enter your API Account token:</label>
                        <input name="accountToken" value={newUserForm.accountToken} onChange={(e) => setNewUserForm({ ...newUserForm, accountToken: e.currentTarget.value })} />
                    </>
            }
            <input type="submit" onClick={() => {
                // send api request and fetch new user details
                fetchNewAgent({newUserForm, setAgentToken, setResp});
            }} />

            <pre>Account token: {accountToken}</pre>
            <pre>Agent token: {agentToken}</pre>
            <pre>Response: {resp}</pre>
        </>
    )
}