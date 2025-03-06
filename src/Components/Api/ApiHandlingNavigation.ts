import { type Dispatch, type SetStateAction } from "react"
import { makeApiPostCall } from "./ApiCalls";

// Negotiate a new contract using the specified ship
export async function sendShipTo(agentToken:string, shipSymbol:string, waypointSymbol:string, setCurrentView: Dispatch<SetStateAction<string>>) {

    // send request to create a new agent
    const body = JSON.stringify({
        "waypointSymbol": waypointSymbol
      });
    const [json, status] = await makeApiPostCall(`my/ships/${shipSymbol}/navigate`, agentToken, body)

    if (status) {
        // set the agent token for later use
        setCurrentView("Fleet Management")
    }
    else {
        console.error(json.error);
    }

}

