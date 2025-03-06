import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall, makeApiPostCall } from "./ApiCalls";
import { FleetShip } from "../Views/Classes";


//fetch names of ships for a user agent
export async function fetchFleet(agentToken: string, setShipData: Dispatch<SetStateAction<FleetShip[]>>) {
    const [json, status] = await makeApiGetCall(`my/ships`, agentToken);

    if (status) {
        setShipData(json.data.map((ship: FleetShip) => ship));
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
    if (shipSymbol) {
        const [json, status] = await makeApiGetCall(`my/ships/${shipSymbol}`, agentToken);
        if (status && json.data) {
            const fleetShipDetails:FleetShip = json.data;
            setFleetShipDetails(fleetShipDetails)
        }
        else {
            console.error(json.error);
        }
    }
}

// interface for data types in doShipAction
interface doShipActionPropTypes {
    agentToken: string;
    shipSymbol: string;
    fleetShipDetails: FleetShip;
    setFleetShipDetails: Dispatch<SetStateAction<FleetShip>>;
    action: string;
}
// Negotiate a new contract using the specified ship
export async function doShipAction({ agentToken, shipSymbol, fleetShipDetails, setFleetShipDetails, action }: doShipActionPropTypes) {
    const currentShipDetails:FleetShip = fleetShipDetails;

    // send request to create a new agent
    const body = "";
    const [json, status] = await makeApiPostCall(`my/ships/${shipSymbol}/${action}`, agentToken, body)

    if (status) {
        const fleetShipDetails:FleetShip = { ...currentShipDetails, ...json.data};
        setFleetShipDetails(fleetShipDetails)    
    }
    else {
        console.error(json.error);
    }

}