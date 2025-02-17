import { type Dispatch, type SetStateAction, useState, useEffect, useContext } from "react";
import { fetchContractList, fetchAcceptedContract } from "../Api/ApiHandlingContract"
import { AgentTokenContext } from "../globalContext";

export default function MissionDashboard() {
    const [contractList, setContractList] = useState([{ contractId: "", contractFaction: "", paymentAcceptance: 0, paymentDelivery: 0, deliverTradeSymbol: "", deliverDestinationSymbol: "", deliverUnitsRequired: 0, deliverUnitsFulfilled: 0, contractType: "", contractAccepted: false, contractFulfilled: false, contractExpiration: new Date(), contractDeadline: new Date() }]);
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    //api request to Fetch details of current missions 
    useEffect(() => {
        fetchContractList(agentToken, setContractList);
    }, [agentToken, setContractList]);

    return (
        <>
            <h2>Mission Dashboard</h2>

            <div id="contractDetails">
                <table>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Faction
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Payment
                            </th>
                            <th>
                                Terms
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map all contracts to buttons so player can choose to view more information */}
                        {contractList.map((contract) => <ContractDetails contract={contract} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

// function to render contracts in table
function ContractDetails(stringContract: any, setContractList:Dispatch<SetStateAction<{ contractId: string; contractFaction: string; paymentAcceptance: number; paymentDelivery: number; deliverTradeSymbol: string; deliverDestinationSymbol: string; deliverUnitsRequired: number; deliverUnitsFulfilled: number; contractType: string; contractAccepted: boolean; contractFulfilled: boolean; contractExpiration: Date; contractDeadline: Date; }[]>>) {
    try {
        const agentToken = useContext(AgentTokenContext); //fetch agent token from context
        const contract = stringContract.contract;
return (
        <tr key={contract.contractId}>
            <td>
                {contract.contractId}
            </td>
            <td>
                {contract.contractFaction}
            </td>
            <td>
                <span>{contract.contractType}</span>
            </td>
            <td>
                {contract.contractAccepted ? <span> Active </span> : contract.contractExpiration && new Date(contract.contractExpiration) > new Date() ? <span>Expired</span> : <input type="button" className="fullWidthButton" value="Accept Contract" onClick={() => fetchAcceptedContract(contract.contractId, agentToken, setContractList)}/>}
            </td>
            <td>
                <span>{contract.paymentAcceptance} / {contract.paymentDelivery} </span>
            </td>
            <td>
                <span>{contract.deliverTradeSymbol}→{contract.deliverDestinationSymbol} &emsp; {contract.deliverUnitsFulfilled} / {contract.deliverUnitsRequired} </span>
            </td>
        </tr>

    )

    }

    catch(e){
        return(
            <tr><td colSpan={6}>{String(e)}</td></tr>
        )
    }
    

}