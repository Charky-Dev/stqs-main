import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall, makeApiPostCall } from "./ApiCalls";
import { ShipyardStock, WaypointProfile } from "../Views/Classes";

// interface for data types in fetchAgentDetails
interface fetchWaypointDetailsPropTypes {
    agentToken: string;
    systemSymbol: string;
    waypointSymbol: string;
    setWaypointDetails: Dispatch<SetStateAction<WaypointProfile>>;
}
//fetch details of waypoint specified
export async function fetchWaypointDetails({ agentToken, systemSymbol, waypointSymbol, setWaypointDetails }: fetchWaypointDetailsPropTypes) {
    if (systemSymbol && waypointSymbol) {
        const [json, status] = await makeApiGetCall(`systems/${systemSymbol}/waypoints/${waypointSymbol}`, agentToken);

        if (status) {
            setWaypointDetails(json.data);
        }
        else {
            console.error(json.error);
        }
    }
}

// interface for data types in fetchAllShipyards
interface fetchWaypointsPropTypes {
    agentToken: string;
    shipLocations: string[];
    filters: string;
}
// Locate all shipyards in area
export async function fetchWaypoints({ agentToken, shipLocations, filters }: fetchWaypointsPropTypes) {
    for (const location of shipLocations) {
        if (location) {
            const [json, status] = await makeApiGetCall(`systems/${location}/waypoints?${filters}`, agentToken);

            if (status) {
                const waypointData = json.data;
                return (waypointData.map((waypoint: WaypointProfile) => waypoint));
            }
            else {
                console.error(json.error);
            }
        }
    }

}

// interface for data types in fetchAllShipyards
interface fetchAllShipyardsPropTypes {
    agentToken: string;
    shipLocations: string[];
    setShipyardNames: Dispatch<SetStateAction<{ shipyardName: string; shipyardWaypoint: string; }[]>>;
}
// Locate all shipyards in area
export async function fetchAllShipyards({ agentToken, shipLocations, setShipyardNames }: fetchAllShipyardsPropTypes) {
    const shipyardNames: SetStateAction<{ shipyardName: string; shipyardWaypoint: string; }[]> = [];
    const filters = "traits=SHIPYARD"
    const shipyardData: WaypointProfile[] = await fetchWaypoints({ agentToken, shipLocations, filters });

    if (shipyardData) {
        // iterate through shipyards and make list of names for ease of access
        for (const shipyard of shipyardData as WaypointProfile[]) {
            shipyardNames.push(
                { shipyardName: shipyard.symbol, shipyardWaypoint: shipyard.systemSymbol });
        }
    }

    setShipyardNames(shipyardNames);

}

// interface for data types in fetchAllWaypoints
interface fetchAllWaypointsPropTypes {
    agentToken: string;
    shipLocations: string[];
    setWaypointDetails: Dispatch<SetStateAction<WaypointProfile[]>>;
}
// Locate all waypoints in area and return as list of WaypointProfiles
export async function fetchAllWaypoints({ agentToken, shipLocations, setWaypointDetails }: fetchAllWaypointsPropTypes) {
    const filters = ""
    const waypointData: WaypointProfile[] = await fetchWaypoints({ agentToken, shipLocations, filters });
    setWaypointDetails(waypointData);

}

// interface for data types in fetchAllShipyards
interface fetchShipyardShipsPropTypes {
    agentToken: string;
    systemSymbol: string;
    shipyardWaypointSymbol: string;
    setShipyardStock: Dispatch<SetStateAction<ShipyardStock[]>>;
}
//fetch list of ships for a shipyard
export async function fetchShipyardShips({ agentToken, systemSymbol, shipyardWaypointSymbol, setShipyardStock }: fetchShipyardShipsPropTypes) {
    if (systemSymbol && shipyardWaypointSymbol) {
        const [json, status] = await makeApiGetCall(`systems/${systemSymbol}/waypoints/${shipyardWaypointSymbol}/shipyard`, agentToken);
        if (status) {
            const shipyardData = json.data.ships;
            if (shipyardData) {
                const shipyardList = [];

                // iterate through ships and make list of names for ease of access
                for (let i = 0; i < shipyardData.length; i++) {
                    const ship = shipyardData[i];
                    const shipyardObject: ShipyardStock = {
                        shipType: ship.type,
                        shipSymbol: ship.name,
                        shipDescription: ship.description,
                        shipSupply: ship.supply,
                        shipPurchasePrice: ship.purchasePrice,
                        shipyardWaypointSymbol: shipyardWaypointSymbol
                    };
                    shipyardList.push(shipyardObject);
                }
                setShipyardStock(shipyardList);
            }
            else {
                const shipyardList = [];
                const shipyardSummary = json.data.shipTypes;
                // iterate through ships and make list of names for ease of access
                for (let i = 0; i < shipyardSummary.length; i++) {
                    const ship = shipyardSummary[i];
                    const shipyardObject: ShipyardStock = {
                        shipType: ship.type,
                        shipSymbol: "unknown",
                        shipDescription: "Visit shipyard for more details",
                        shipSupply: "unknown",
                        shipPurchasePrice: 0,
                        shipyardWaypointSymbol: shipyardWaypointSymbol
                    };
                    shipyardList.push(shipyardObject);
                }
                setShipyardStock(shipyardList);
            }
        }
        else {
            console.error(json.error);
        }
    }
}

// interface for data types in fetchNewShip
interface fetchNewShipPropTypes {
    agentToken: string;
    shipType: string;
    shipyardWaypointSymbol: string;
    setCurrentView: Dispatch<SetStateAction<string>>
}
// Negotiate a new contract using the specified ship
export async function fetchNewShip({ agentToken, shipType, shipyardWaypointSymbol, setCurrentView }: fetchNewShipPropTypes) {

    // send request to create a new agent
    const body = JSON.stringify({
        shipType: shipType,
        waypointSymbol: shipyardWaypointSymbol,
    });
    const [json, status] = await makeApiPostCall(`my/ships`, agentToken, body)

    if (status) {
        // set the agent token for later use
        setCurrentView("Fleet Management")
    }
    else {
        console.error(json.error);
    }

}