import { type Dispatch, type SetStateAction } from "react"
import { makeApiGetCall, makeApiPostCall } from "./ApiCalls";
import { ShippingContract } from "../Views/Classes";


//fetch list of contracts for a user agent
export async function fetchContractList(agentToken: string, setContractDetails: Dispatch<SetStateAction<ShippingContract[]>>) {
    const [json, status] = await makeApiGetCall(`my/contracts`, agentToken);
    if (status) {
        const contractList:ShippingContract[] = [];
        const contractData = json.data;

        // iterate through ships and make list of names for ease of access
        for (let i = 0; i < contractData.length; i++) {
            const contract = contractData[i];
            const contractObject:ShippingContract = {
                id: contract.id,
                factionSymbol: contract.factionSymbol,
                type: contract.type,
                terms: {
                    deadline: contract.terms.deadline,
                    payment: {
                      onAccepted: contract.terms.payment.onAccepted,
                      onFulfilled: contract.terms.payment.onFulfilled
                    },
                    deliver: {
                      tradeSymbol: contract.terms.deliver[0].tradeSymbol,
                      destinationSymbol: contract.terms.deliver[0].destinationSymbol,
                      unitsRequired: contract.terms.deliver[0].unitsRequired,
                      unitsFulfilled: contract.terms.deliver[0].unitsFulfilled
                    }
                  },

                  accepted: contract.accepted,
                  fulfilled: contract.contractFulfilled,
                  expiration: contract.contractExpiration,
                  deadlineToAccept: contract.contractDeadline
            };
            contractList.push(contractObject);
        }
        setContractDetails(contractList);
    }
    else {
        console.error(json.error);
    }
}

//accept the specified contract
export async function fetchAcceptedContract(contractId: string, agentToken: string, setContractDetails: Dispatch<SetStateAction<ShippingContract[]>>) {
    const [json, status] = await makeApiPostCall(`my/contracts/${contractId}/accept`, agentToken, "")

    if (status) {
        fetchContractList(agentToken, setContractDetails);
    }
    else {
        console.error(json.error);
    }

}

// Negotiate a new contract using the specified ship
export async function fetchNewContract(agentToken: string, shipSymbol: string, setCurrentView: Dispatch<SetStateAction<string>>) {
    const [json, status] = await makeApiPostCall(`my/ships/${shipSymbol}/Negotiate/contract`, agentToken, "")

    if (status) {
        setCurrentView("Mission Dashboard")
    }
    else {
        console.error(json.error);
    }

}