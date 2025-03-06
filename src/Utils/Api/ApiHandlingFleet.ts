import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall, makeApiPostCall } from "./ApiWrappers";
import { FleetShipDetails } from "../../Views/GameInterface/Fleet Management/FleetClasses";


//fetch names of ships for a user agent
export async function fetchFleet(agentToken: string, setShipData: Dispatch<SetStateAction<FleetShipDetails[]>>) {
    const [json, status] = await makeApiGetCall(`my/ships`, agentToken);

    if (status) {
        setShipData(json.data.map((ship: FleetShipDetails) => ship));
    }
    else {
        console.error(json.error);
    }
}

// interface for data types in fetchShip
interface fetchShipPropTypes {
    agentToken: string;
    shipSymbol: string;
    setFleetShipDetails: Dispatch<SetStateAction<FleetShipDetails>>;
}
//function to fetch information on a user's ship based on designation
export async function fetchShip({ agentToken, shipSymbol, setFleetShipDetails }: fetchShipPropTypes) {
    if (shipSymbol) {
        const [json, status] = await makeApiGetCall(`my/ships/${shipSymbol}`, agentToken);
        if (status && json.data) {
            const fleetShipDetails:FleetShipDetails = json.data;
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
    fleetShipDetails: FleetShipDetails;
    setFleetShipDetails: Dispatch<SetStateAction<FleetShipDetails>>;
    action: string;
}
// Negotiate a new contract using the specified ship
export async function doShipAction({ agentToken, shipSymbol, fleetShipDetails, setFleetShipDetails, action }: doShipActionPropTypes) {
    const currentShipDetails:FleetShipDetails = fleetShipDetails;

    // send request to create a new agent
    const body = "";
    const [json, status] = await makeApiPostCall(`my/ships/${shipSymbol}/${action}`, agentToken, body)

    if (status) {
        const fleetShipDetails:FleetShipDetails = { ...currentShipDetails, ...json.data};
        setFleetShipDetails(fleetShipDetails)    
    }
    else {
        console.error(json.error);
    }

}