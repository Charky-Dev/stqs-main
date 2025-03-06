import { type Dispatch, type SetStateAction, useState, useEffect, useContext } from "react";
import { fetchContractList } from "../../../Utils/Api/ApiHandlingContract";
import { AgentTokenContext, PageViewContext } from "../../../Utils/GlobalContext";
import { ShippingContract } from "./MissionClasses";
import { fetchAcceptedContract } from "../../../Utils/Api/ApiHandlingContract";
import moneyIcon from "../../../Assets/images/money.png"

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
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map all contracts to buttons so player can choose to view more information */}
                        {contractList.length > 0 ?
                        contractList.map((contract: ShippingContract) => <ContractDetails key={contract.id} thisContract={contract} setContractList={setContractList} />) :
                        <tr><td>No Available Contract</td></tr>}
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
                    <span>
                    <img src={moneyIcon} className="playerIcon" title="Money paid upfront"></img>
                    {thisContract.terms.payment.onAccepted} / <br/>
                    <img src={moneyIcon} className="playerIcon" title="Money paid on completion"></img>
                    {thisContract.terms.payment.onFulfilled} </span>
                </td>
                <td>
                    {thisContract.terms.deliver.map((term) => <ContractTerms term={term} key={term.tradeSymbol}/>)}
                </td>
                <td>
                    <MissionAction thisContract={thisContract} />
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

function ContractTerms({term}:{term:{ tradeSymbol: string; destinationSymbol: string; unitsRequired: number; unitsFulfilled: number; }}){
return(
    <>
    <hr/>
    <span>{term.tradeSymbol}→{term.destinationSymbol}</span>
    <br/>
    <span>{term.unitsFulfilled} / {term.unitsRequired} </span>
    <br/>
    <hr/>
    </>
)
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


function MissionAction({ thisContract }: { thisContract: ShippingContract }){
    const setCurrentView = useContext(PageViewContext)[1]; // import page state from context
    // const [fleetShipDetails, setFleetShipDetails] = useContext(FleetShipDetailsContext); // currently selected ship

    // if (!fleetShipDetails.nav.waypointSymbol){
    //     // if there's no ship
    //    return(<span>No ship selected</span> )
    // }
    // else if (thisContract.terms.deliver.destinationSymbol === fleetShipDetails.nav.waypointSymbol){
    //     //if there's a ship and it's at the delivery destination
    //     if (fleetShipDetails.nav.status === "IN_ORBIT"){
    //         //if it's in orbit
    //         return(
    //         <input type="button" className="fullWidthButton" value="Dock Ship" onClick={() => DoShipAction({ body:"", shipSymbol: fleetShipDetails.symbol, fleetShipDetails:fleetShipDetails, setFleetShipDetails, action: 'dock' })} />
    //     )
    //     }
    //     else{
    //         //if it has docked
    //         const currentCargoUnits = fleetShipDetails.cargo.inventory.filter((product) => product.symbol == thisContract.terms.deliver.tradeSymbol)[0].units;
    //         const messageBody = { shipSymbol: fleetShipDetails.symbol, tradeSymbol: thisContract.terms.deliver.tradeSymbol, units: currentCargoUnits};

    //         // return(
    //         //     <input type="button" className="fullWidthButton" value="Deliver Cargo" onClick={() => DeliverCargo({ body: JSON.stringify(messageBody), contractId:thisContract.id })} />
    //         // )
    //     }
        
    // }
    // else{
    //     //if there's a ship and it's NOT at the delivery destination
    //     if (fleetShipDetails.nav.status === "IN_ORBIT"){
    //         //if it's in orbit
    //         return(
    //         <input type="button" className="fullWidthButton" value="Send Ship" onClick={() => SendShipTo(fleetShipDetails.symbol, thisContract.terms.deliver.destinationSymbol, setCurrentView)} />
    //     )
    //     }
    //     else{
    //         //if it needs to orbit
    //         return(
    //         <input type="button" className="fullWidthButton" value="Orbit Ship" onClick={() => DoShipAction({ body:"", shipSymbol: fleetShipDetails.symbol, fleetShipDetails, setFleetShipDetails, action: "orbit" })} />
    //         )
    //     }
    // }
    return(<span>Actions Here</span>)
}