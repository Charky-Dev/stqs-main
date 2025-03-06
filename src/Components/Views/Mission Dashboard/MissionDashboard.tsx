import { type Dispatch, type SetStateAction, useState, useEffect, useContext } from "react";
import { fetchContractList, fetchAcceptedContract } from "../../Api/ApiHandlingContract"
import { AgentTokenContext } from "../../GlobalContext";
import { ShippingContract } from "../Classes";

export default function MissionDashboard() {
    const [contractList, setContractList] = useState([new ShippingContract]);
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
                        {contractList.map((contract: ShippingContract) => <ContractDetails key={contract.id} thisContract={contract} setContractList={setContractList} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

// function to render thisContracts in table
function ContractDetails({ thisContract, setContractList }: { thisContract: ShippingContract, setContractList: Dispatch<SetStateAction<ShippingContract[]>> }) {
    try {

        return (
            <tr key={thisContract.id}>
                <td>
                    {thisContract.id}
                </td>
                <td>
                    {thisContract.factionSymbol}
                </td>
                <td>
                    <span>{thisContract.type}</span>
                </td>
                <td>
                    <ContractAcceptance thisContract={thisContract} setContractList={setContractList}/>
                </td>
                <td>
                    <span>{thisContract.terms.payment.onAccepted} / {thisContract.terms.payment.onFulfilled} </span>
                </td>
                <td>
                    <span>{thisContract.terms.deliver.tradeSymbol}→{thisContract.terms.deliver.destinationSymbol}</span>
                    <br/>
                    <span>{thisContract.terms.deliver.unitsFulfilled} / {thisContract.terms.deliver.unitsRequired} </span>
                </td>
            </tr>

        ) 

    }
    catch (e) {
        return (
            <tr><td colSpan={6}>{String(e)}</td></tr>
        )
    }
}

function ContractAcceptance({ thisContract, setContractList }: { thisContract: ShippingContract, setContractList: Dispatch<SetStateAction<ShippingContract[]>> }) {
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context
    const thisContractExpiry = new Date(thisContract.terms.deadline);
    const thisContractDeadline = new Date(thisContract.deadlineToAccept);
    const currentDateTime = new Date();
    if (thisContract.accepted) {
        if (thisContractExpiry > currentDateTime) {
            return <span>Active until {thisContractExpiry.toUTCString()}</span>
        }
        else {
            return <span>Contract Expired</span>
        }
    }
    else if (thisContractDeadline > currentDateTime) {
        return <input type="button" className="fullWidthButton" value="Accept this Contract" onClick={() => fetchAcceptedContract(thisContract.id, agentToken, setContractList)} />
    }
    else {
        return <span>Not Accepted</span>
    }
}