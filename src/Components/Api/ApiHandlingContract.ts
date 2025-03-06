import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall } from "./ApiCalls";

//fetch list of contracts for a user agent
export async function fetchContractList(agentToken: string, setContractDetails: Dispatch<SetStateAction<{ contractId: string; contractFaction: string; paymentAcceptance: number; paymentDelivery: number; deliverTradeSymbol: string; deliverDestinationSymbol: string; deliverUnitsRequired: number; deliverUnitsFulfilled: number; contractType: string; contractAccepted: boolean; contractFulfilled: boolean; contractExpiration: Date; contractDeadline: Date; }[]>>) {
    const [json, status] = await makeApiGetCall(`my/contracts`, agentToken);
    if (status) {
        const contractList = [];
        const contractData = json.data;

        // iterate through ships and make list of names for ease of access
        for (let i = 0; i < contractData.length; i++) {
            const contract = contractData[i];
            console.log(contract);
            const contractObject = { contractId: contract.id, contractFaction: contract.factionSymbol, paymentAcceptance: contract.terms.payment.onAccepted, paymentDelivery: contract.terms.payment.onFulfilled, deliverTradeSymbol: contract.terms.deliver[0].tradeSymbol, deliverDestinationSymbol: contract.terms.deliver[0].destinationSymbol, deliverUnitsRequired: contract.terms.deliver[0].unitsRequired, deliverUnitsFulfilled: contract.terms.deliver[0].unitsFulfilled, contractType: contract.type, contractAccepted: contract.accepted, contractFulfilled: contract.contractFulfilled, contractExpiration: contract.contractExpiration, contractDeadline: contract.contractDeadline };
            contractList.push(contractObject);
        }
        setContractDetails(contractList);
    }
    else {
        console.error(json.error);
    }
}

//accept the specified contract
export async function fetchAcceptedContract(contractId: string, agentToken: string, setContractDetails: Dispatch<SetStateAction<{ contractId: string; contractFaction: string; paymentAcceptance: number; paymentDelivery: number; deliverTradeSymbol: string; deliverDestinationSymbol: string; deliverUnitsRequired: number; deliverUnitsFulfilled: number; contractType: string; contractAccepted: boolean; contractFulfilled: boolean; contractExpiration: Date; contractDeadline: Date; }[]>>) {
    const resp = await fetch(`https://api.spacetraders.io/v2/my/contracts/${contractId}/accept`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${agentToken}`,
            "Content-Type": "application/json",
        }
    })
    const json = await resp.json();

    if (resp.ok) {
        fetchContractList(agentToken, setContractDetails);
    }
    else {
        console.error(json.error);
    }
}

// Negotiate a new contract using the specified ship
export async function fetchNewContract(agentToken: string, shipSymbol: string, setCurrentView: Dispatch<SetStateAction<string>>) {

    const resp = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/Negotiate/contract`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${agentToken}`,
            "Content-Type": "application/json",
        }
    })
    const json = await resp.json();

    if (resp.ok) {
        setCurrentView("Mission Dashboard")
    }
    else {
        console.error(json.error);
    }
}