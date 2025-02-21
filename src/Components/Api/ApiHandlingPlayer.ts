import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall, makeApiPostCall } from "./ApiCalls";

// interface for data types in fetchNewAgent
interface newAgentPropTypes {
    newUserForm: { symbol: string; faction: string; accountToken: string; };
    setAgentToken: Dispatch<SetStateAction<string>>;
    setResp: Dispatch<SetStateAction<string>>;
}
// create and fetch details of a new agent
export async function fetchNewAgent({ newUserForm, setAgentToken, setResp }: newAgentPropTypes) {
    // save this to session storage to persist after an accidental refresh
    localStorage.setItem('accountToken', JSON.stringify(newUserForm.accountToken));

    try {
        // send request to create a new agent
        const body = JSON.stringify({ symbol: newUserForm.symbol, faction: newUserForm.faction });
        const [json, status] = await makeApiPostCall(`register`, newUserForm.accountToken, body)

        if (status) {
            // set the agent token for later use
            setAgentToken(json.data.token);
            setResp(JSON.stringify(json, null, 2));
        }
    }

    catch (e) {
        return ([{ error: e }, 400]);
    }
}

// interface for data types in fetchAgentDetails
interface fetchAgentPropTypes {
    returningUserForm: { agentToken: string; };
    setAgentToken: Dispatch<SetStateAction<string>>;
    setResp: Dispatch<SetStateAction<string>>;
}
// fetch basic details of an existing agent using 
export async function fetchAgentDetails({ returningUserForm, setAgentToken, setResp }: fetchAgentPropTypes) {
    //save token to session storage for future use
    sessionStorage.setItem('agentToken', JSON.stringify(returningUserForm.agentToken));

    const [json, status] = await makeApiGetCall(`my/agent`, returningUserForm.agentToken);

    if (status) {
        // set the agent token for later use
        setAgentToken(returningUserForm.agentToken);
        setResp(JSON.stringify(json, null, 2));
    }
    else {
        console.error(json.error);
    }

}

// interface for data types in fetchAgentDetails
interface fetchReturningPropTypes {
    agentToken: string;
    setUserData: Dispatch<SetStateAction<{ symbol: string, faction: string, agentToken: string }>>;
    setUserHeadquarters: Dispatch<SetStateAction<string>>;
    setUserCredits: Dispatch<SetStateAction<number>>;
    setUserShips: Dispatch<SetStateAction<number>>;
}
// fetch details of an returning player using token
export async function fetchReturningPlayer({ agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips }: fetchReturningPropTypes) {
    const [json, status] = await makeApiGetCall(`my/agent`, agentToken);

    if (status) {
        setUserData({ symbol: JSON.stringify(json.data.symbol), faction: JSON.stringify(json.data.startingFaction), agentToken: agentToken });
        setUserHeadquarters(JSON.stringify(json.data.headquarters));
        setUserCredits(JSON.parse(json.data.credits));
        setUserShips(JSON.parse(json.data.shipCount));
    }
    else {
        console.error(json.error);
    }
}

