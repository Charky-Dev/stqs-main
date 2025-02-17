import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall } from "./ApiCalls";


//fetch names of ships for a user agent
export async function fetchFleet(agentToken: string, setShipNames: Dispatch<SetStateAction<string[]>>) {
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
    else {
        console.error(json.error);
    }
}

//fetch locations of ships for a user agent
export async function fetchFleetLocations(agentToken: string, setShipNames: Dispatch<SetStateAction<string[]>>) {
    const [json, status] = await makeApiGetCall(`my/ships`, agentToken);

    if (status) {
        const shipNames: string[] = [];
        const shipData = json.data;

        // iterate through ships and make list of names for ease of access
        for (const ship in shipData) {
            shipNames.push(shipData[ship].nav.systemSymbol);
        }

        setShipNames([...new Set(shipNames)]);
    }
    else {
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
export async function fetchShip({ agentToken, shipSymbol, setShipRegistration, setShipCooldown, setShipNav }: fetchShipPropTypes) {
    const [json, status] = await makeApiGetCall(`my/ships/${shipSymbol}`, agentToken);

    if (status) {
        setShipRegistration({ name: json.data.registration.name, factionSymbol: json.data.registration.factionSymbol, role: json.data.registration.role });
        setShipCooldown({ totalSeconds: json.data.cooldown.totalSeconds, remainingSeconds: json.data.cooldown.remainingSeconds });
        setShipNav({ systemSymbol: json.data.nav.systemSymbol, waypointSymbol: json.data.nav.waypointSymbol, route: JSON.stringify(json.data.nav.route, null, 2), status: json.data.nav.status, flightMode: json.data.nav.flightMode })
    }
    else {
        console.error(json.error);
    }
}