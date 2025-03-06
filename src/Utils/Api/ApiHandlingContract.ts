import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall, makeApiPostCall } from "./ApiWrappers";
import { ShippingContract } from "../../Views/GameInterface/Mission Dashboard/MissionClasses";
import { Views } from "../ViewChoices";

//fetch list of contracts for a user agent
export async function fetchContractList(agentToken: string, setContractDetails: Dispatch<SetStateAction<ShippingContract[]>>) {
    const [json, status] = await makeApiGetCall(`my/contracts`, agentToken);
    if (status) {        
        setContractDetails(json.data.map((contract: ShippingContract) => contract));
    }
    else {
        console.error(json.error);
    }
}

//accept the specified contract
export async function fetchAcceptedContract(contractId: string, agentToken: string, setContractDetails: Dispatch<SetStateAction<ShippingContract[]>>) {
    if (contractId) {

        const [json, status] = await makeApiPostCall(`my/contracts/${contractId}/accept`, agentToken, "");

        if (status) {
            fetchContractList(agentToken, setContractDetails);
        }
        else {
            console.error(json.error);
        }
    }
}

// Negotiate a new contract using the specified ship
export async function fetchNewContract(agentToken: string, shipSymbol: string, setCurrentView: Dispatch<SetStateAction<string>>) {
    if (shipSymbol) {
        const [json, status] = await makeApiPostCall(`my/ships/${shipSymbol}/Negotiate/contract`, agentToken, "");

        if (status) {
            setCurrentView(Views.MissionDashboard);
        }
        else {
            console.error(json.error);
        }

    }
}