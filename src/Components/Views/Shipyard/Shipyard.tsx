import { useState, useEffect, useContext } from "react";
import { fetchFleetLocations } from "../../Api/ApiHandlingFleet"
import { fetchAllShipyards, fetchShipyardShips, fetchNewShip} from "../../Api/ApiHandlingWaypoint"
import { AgentTokenContext, PageViewContext } from "../../GlobalContext";
import { ShipyardStock } from "../Classes";

export default function Shipyard() {
    const [shipyardNames, setShipyardNames] = useState([{ shipyardName: "", shipyardWaypoint: "" }]); //list of the player's shipyards for quick reference
    const [currentShipyard, setCurrentShipyard] = useState({ shipyardName: "", shipyardWaypoint: "" }); //information about currently selected shipyard
    const [shipLocations, setShipLocations] = useState([""]); //list of the player's ships for quick reference
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    // Fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleetLocations(agentToken, setShipLocations);
    }, [agentToken, setShipLocations]);

    // Fetch information about the player's shipyards from the api
    useEffect(() => {
        fetchAllShipyards({agentToken, shipLocations, setShipyardNames});
    }, [agentToken, shipLocations, setShipyardNames]);
    
    return (
        <>
            <h2>View</h2>
            <div id="fleetList">
                {/* map all shipyards to buttons so player can choose to view more information */}
                {shipyardNames.map(({ shipyardName, shipyardWaypoint }) => <input key={shipyardName} type="button" className={currentShipyard.shipyardName == shipyardName ? "activeGenericButton" : "genericButton"} value={shipyardName} onClick={() => setCurrentShipyard({ shipyardName, shipyardWaypoint })} />)}
            </div>
            <div id="shipyardOverview">
                {/* Fetch information about the currently selected shipyard */}
                {currentShipyard.shipyardName === "None" ? null : <ShipyardDetails shipyardWaypointSymbol={currentShipyard.shipyardName} systemSymbol={currentShipyard.shipyardWaypoint} />}
            </div>
        </>
    )
}

// function to render shipyards in table
function ShipyardDetails({ shipyardWaypointSymbol, systemSymbol }: { shipyardWaypointSymbol: string, systemSymbol: string }) {
    const [shipyardStock, setShipyardStock] = useState([ new ShipyardStock]);
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    useEffect(() => {
        fetchShipyardShips({agentToken, systemSymbol, shipyardWaypointSymbol, setShipyardStock});
    }, [agentToken, systemSymbol, shipyardWaypointSymbol, setShipyardStock]);

    return (
        <div id="contractDetails">
            {shipyardStock[0].shipType &&
                <table>
                    <thead>
                        <tr>
                            <th>
                                Type
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Supply
                            </th>
                            <th>
                                Payment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map all ships to buttons so player can choose to view more information */}
                        {shipyardStock.map((ship:ShipyardStock) => <ShipDetails shipyardShip={ship} />)}
                    </tbody>
                </table>
            }
        </div>

    )
}

// function to render ships in table
function ShipDetails({shipyardShip}:{shipyardShip: ShipyardStock}) {
        const agentToken = useContext(AgentTokenContext); //fetch agent token from context
        const setCurrentView = useContext(PageViewContext);
    try {
        const shipProps = {agentToken:agentToken, shipType:shipyardShip.shipType, shipyardWaypointSymbol:shipyardShip.shipyardWaypointSymbol, setCurrentView:setCurrentView[1]};

        return (
            <tr key={shipyardShip.shipName}>
                <td>
                    {shipyardShip.shipType}
                </td>
                <td>
                    {shipyardShip.shipName}
                </td>
                <td>
                    {shipyardShip.shipDescription}
                </td>
                <td>
                    {shipyardShip.shipSupply}
                </td>
                <td>
                    {shipyardShip.shipPurchasePrice ? <input type="button" className="fullWidthButton" value="Purchase Ship" onClick={() => fetchNewShip(shipProps)}/> : "Unknown"}
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