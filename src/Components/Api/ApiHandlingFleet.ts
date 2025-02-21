import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall } from "./ApiCalls";
import { FleetShip } from "../Views/Classes";


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
    setFleetShipDetails: Dispatch<SetStateAction<FleetShip>>;
}
//function to fetch information on a user's ship based on designation
export async function fetchShip({ agentToken, shipSymbol, setFleetShipDetails }: fetchShipPropTypes) {
    const [json, status] = await makeApiGetCall(`my/ships/${shipSymbol}`, agentToken);

    const fleetShipDetails: FleetShip = {
        symbol: json.data.symbol,
        registration: {
            name: json.data.registration.name,
            factionSymbol: json.data.registration.factionSymbol,
            role: json.data.registration.role
        },
        cooldown: {
            totalSeconds: json.data.cooldown.totalSeconds,
            remainingSeconds: json.data.cooldown.remainingSeconds
        },
        nav: {
            systemSymbol: json.data.nav.systemSymbol,
            waypointSymbol: json.data.nav.waypointSymbol,
            route: JSON.stringify(json.data.nav.route, null, 2),
            status: json.data.nav.status,
            flightMode: json.data.nav.flightMode
        },
    }

    if (status) {
        setFleetShipDetails(fleetShipDetails)
    }
    else {
        console.error(json.error);
    }
}