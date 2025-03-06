import { type Dispatch, type SetStateAction } from "react"

//function to make 'get' calls using specified url endpoint and agent token
async function makeApiGetCall(endpoint: string, agentToken: string) {
    try {
        const resp = await fetch(`https://api.spacetraders.io/v2/${endpoint}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${agentToken}`,
                "Content-Type": "application/json",
            },
        })
        //parse result
        const json = await resp.json();

        return [json, resp.ok]
    }
    catch (e) {
        return ([{ error: e }, false])
    }
}

// interface for data types in fetchNewAgent
interface newAgentPropTypes {
    newUserForm: { symbol: string; faction: string; accountToken: string; };
    setAgentToken: Dispatch<SetStateAction<string>>;
    setResp: Dispatch<SetStateAction<string>>;
}
// create and fetch details of a new agent
async function fetchNewAgent({ newUserForm, setAgentToken, setResp }: newAgentPropTypes) {
    // save this to session storage to persist after an accidental refresh
    localStorage.setItem('accountToken', JSON.stringify(newUserForm.accountToken));

    try {
        // send request to create a new agent
        const resp = await fetch(`https://api.spacetraders.io/v2/register`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + newUserForm.accountToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                symbol: newUserForm.symbol,
                faction: newUserForm.faction,
            }),
        });

        const json = await resp.json();

        if (resp.ok) {
            // set the agent token for later use
            setAgentToken(json.data.token);
            setResp(JSON.stringify(json, null, 2));
        }
    }
    catch (e) {
        return ([{ error: e }, 400])
    }
}

// interface for data types in fetchAgentDetails
interface fetchAgentPropTypes {
    returningUserForm: { agentToken: string; };
    setAgentToken: Dispatch<SetStateAction<string>>;
    setResp: Dispatch<SetStateAction<string>>;
}
// fetch basic details of an existing agent using 
async function fetchAgentDetails({ returningUserForm, setAgentToken, setResp }: fetchAgentPropTypes) {
    //save token to session storage for future use
    sessionStorage.setItem('agentToken', JSON.stringify(returningUserForm.agentToken));

    const [json, status] = await makeApiGetCall(`my/agent`, returningUserForm.agentToken);

    if (status) {
        // set the agent token for later use
        setAgentToken(returningUserForm.agentToken);
        setResp(JSON.stringify(json, null, 2));
    }
    else{
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
async function fetchReturningPlayer({ agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips }: fetchReturningPropTypes) {
    const [json, status] = await makeApiGetCall(`my/agent`, agentToken);

    if (status) {
        setUserData({ symbol: JSON.stringify(json.data.symbol), faction: JSON.stringify(json.data.startingFaction), agentToken: agentToken });
        setUserHeadquarters(JSON.stringify(json.data.headquarters));
        setUserCredits(JSON.parse(json.data.credits));
        setUserShips(JSON.parse(json.data.shipCount));
    }
    else{
        console.error(json.error);
    }
}

//fetch details of contracts for a user agent
async function fetchContractDetails(agentToken: string, setContractDetails: Dispatch<SetStateAction<string>>) {
    const [json, status] = await makeApiGetCall(`my/contracts`, agentToken);
    if (status) {
        setContractDetails(JSON.stringify(json, null, 2));
    }
    else{
        console.error(json.error);
    }
}

//fetch details of ships for a user agent
async function fetchFleet(agentToken: string, setShipNames: Dispatch<SetStateAction<string[]>>) {
    const [json, status] = await makeApiGetCall(`my/ships`, agentToken);

    if (status) {
        const shipNames: string[] = [];
        const shipData = json.data;

        // iterate through ships and make list of names for ease of access
        for (const ship in shipData) {
            shipNames.push(shipData[ship].symbol);
        }

        setShipNames(shipNames);
    }
        else{
        console.error(json.error);
    }
}

// interface for data types in fetchShip
interface fetchShipPropTypes {
    agentToken: string;
    shipSymbol: string;
    setShipRegistration: Dispatch<SetStateAction<{ name: string, factionSymbol: string, role: string }>>;
    setShipCooldown: Dispatch<SetStateAction<{ totalSeconds: number, remainingSeconds: number }>>;
    setShipNav: Dispatch<SetStateAction<{ systemSymbol: string, waypointSymbol: string, route: string, status: string, flightMode: string }>>;
}
//function to fetch information on a user's ship based on designation
async function fetchShip({ agentToken, shipSymbol, setShipRegistration, setShipCooldown, setShipNav }: fetchShipPropTypes) {
    const [json, status] = await makeApiGetCall(`my/ships/${shipSymbol}`, agentToken);

    if (status) {
        setShipRegistration({ name: json.data.registration.name, factionSymbol: json.data.registration.factionSymbol, role: json.data.registration.role });
        setShipCooldown({ totalSeconds: json.data.cooldown.totalSeconds, remainingSeconds: json.data.cooldown.remainingSeconds });
        setShipNav({ systemSymbol: json.data.nav.systemSymbol, waypointSymbol: json.data.nav.waypointSymbol, route: JSON.stringify(json.data.nav.route, null, 2), status: json.data.nav.status, flightMode: json.data.nav.flightMode })
    }
    else{
        console.error(json.error);
    }
}

// interface for data types in fetchAgentDetails
interface fetchWaypointPropTypes {
    agentToken: string;
    systemSymbol: string;
    waypointSymbol: string;
    setWaypointDetails: Dispatch<SetStateAction<string>>;
}
//fetch details of waypoint specified
async function fetchWaypoint({ agentToken, systemSymbol, waypointSymbol, setWaypointDetails }: fetchWaypointPropTypes) {
    const [json, status] = await makeApiGetCall(`systems/${systemSymbol}/waypoints/${waypointSymbol}`, agentToken);

    if (status) {
        setWaypointDetails(JSON.stringify(json, null, 2));
    }
    else{
        console.error(json.error);
    }
}

export { fetchNewAgent, fetchAgentDetails, fetchReturningPlayer, fetchContractDetails, fetchFleet, fetchShip, fetchWaypoint }