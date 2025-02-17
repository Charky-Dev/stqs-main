import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall } from "./ApiCalls";

// interface for data types in fetchAgentDetails
interface fetchWaypointPropTypes {
    agentToken: string;
    systemSymbol: string;
    waypointSymbol: string;
    setWaypointDetails: Dispatch<SetStateAction<string>>;
}
//fetch details of waypoint specified
export async function fetchWaypoint({ agentToken, systemSymbol, waypointSymbol, setWaypointDetails }: fetchWaypointPropTypes) {
    const [json, status] = await makeApiGetCall(`systems/${systemSymbol}/waypoints/${waypointSymbol}`, agentToken);

    if (status) {
        setWaypointDetails(JSON.stringify(json, null, 2));
    }
    else {
        console.error(json.error);
    }
}


// Locate all shipyards in area
export async function fetchAllShipyards(agentToken: string, shipLocations: string[], setShipyardNames: Dispatch<SetStateAction<{ shipyardName: string; shipyardWaypoint: string; }[]>>) {
    const shipyardNames: SetStateAction<{ shipyardName: string; shipyardWaypoint: string; }[]> = [];

    for (const location in shipLocations) {
        const [json, status] = await makeApiGetCall(`systems/${shipLocations[location]}/waypoints?traits=SHIPYARD`, agentToken);

        if (status) {
            const shipyardData = json.data;

            // iterate through shipyards and make list of names for ease of access
            for (const shipyard in shipyardData) {
                shipyardNames.push(
                    { shipyardName: shipyardData[shipyard].symbol, shipyardWaypoint: shipyardData[shipyard].systemSymbol });
            }

        }
        else {
            console.error(json.error);
        }
    }
    setShipyardNames(shipyardNames);

}

//fetch list of ships for a shipyard
export async function fetchShipyardShips(agentToken: string, systemSymbol: string, shipyardWaypointSymbol: string, setShipyardDetails: Dispatch<SetStateAction<{ shipType: string; shipName: string; shipDescription: string; shipSupply: string; shipPurchasePrice: number;shipyardSymbol: string; }[]>>) {
    const [json, status] = await makeApiGetCall(`systems/${systemSymbol}/waypoints/${shipyardWaypointSymbol}/shipyard`, agentToken);
    if (status) {
        const shipyardData = json.data.ships;
        if (shipyardData) {
            const shipyardList = [];

            // iterate through ships and make list of names for ease of access
            for (let i = 0; i < shipyardData.length; i++) {
                const ship = shipyardData[i];
                const shipyardObject = { shipType: ship.type, shipName: ship.name, shipDescription: ship.description, shipSupply: ship.supply, shipPurchasePrice: ship.purchasePrice, shipyardSymbol: shipyardWaypointSymbol};
                shipyardList.push(shipyardObject);
            }
            setShipyardDetails(shipyardList);
        }
        else{
            const shipyardList = [];
            const shipyardSummary = json.data.shipTypes;
            // iterate through ships and make list of names for ease of access
            for (let i = 0; i < shipyardSummary.length; i++) {
                const ship = shipyardSummary[i];
                const shipyardObject = { shipType: ship.type, shipName: "unknown", shipDescription: "Visit shipyard for more details", shipSupply: "unknown", shipPurchasePrice: 0, shipyardSymbol: shipyardWaypointSymbol};
                shipyardList.push(shipyardObject);
            }
            setShipyardDetails(shipyardList);
        }
    }
    else {
        console.error(json.error);
    }
}

// Negotiate a new contract using the specified ship
export async function fetchNewShip(agentToken: string, shipSymbol: string, shipyardWaypointSymbol: string, setCurrentView: Dispatch<SetStateAction<string>>) {
    // send request to create a new agent
        const resp = await fetch(`https://api.spacetraders.io/v2/my/ships`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${agentToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shipType: shipSymbol,
                waypointSymbol: shipyardWaypointSymbol,
              }),
        });

        const json = await resp.json();

    if (resp.ok) {
        setCurrentView("Fleet Management")
    }
    else {
        console.error(json.error);
    }
}