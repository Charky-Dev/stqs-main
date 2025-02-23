import { useState, useEffect, useContext } from "react";
import { fetchFleet } from "../../Api/ApiHandlingFleet"
import { fetchAllShipyards, fetchShipyardShips, fetchNewShip} from "../../Api/ApiHandlingWaypoint"
import { AgentTokenContext, PageViewContext } from "../../GlobalContext";
import { ShipyardStock, FleetShip } from "../Classes";

export default function Shipyard() {
    const [shipData, setShipData] = useState([new FleetShip]); //list of the player's ships
    const [shipyardNames, setShipyardNames] = useState([{ shipyardName: "", shipyardWaypoint: "" }]); //list of the player's shipyards
    const [currentShipyard, setCurrentShipyard] = useState({ shipyardName: "", shipyardWaypoint: "" }); //information about currently selected shipyard
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    // Fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleet(agentToken, setShipData);
    }, [agentToken, setShipData]);

    // Fetch information about the player's shipyards from the api
    useEffect(() => {
        const shipLocations = shipData.map((ship: FleetShip) => ship.nav.systemSymbol);
        fetchAllShipyards({agentToken, shipLocations, setShipyardNames});
    }, [agentToken, shipData, setShipyardNames]);
    
    return (
        <>
            <h2>Local Shipyards</h2>
            <div id="fleetList">
                {/* map all shipyards to buttons so player can choose to view more information */}
                {shipyardNames.map(({ shipyardName, shipyardWaypoint }) => <input key={shipyardName} type="button" className={currentShipyard.shipyardName === shipyardName ? "activeGenericButton" : "genericButton"} value={shipyardName} onClick={() => setCurrentShipyard({ shipyardName, shipyardWaypoint })} />)}
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
                        {shipyardStock.map((ship:ShipyardStock) => <ShipDetails key={ship.shipType} shipyardShip={ship} />)}
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
            <tr key={shipyardShip.shipSymbol}>
                <td>
                    {shipyardShip.shipType.replace(/_/g," ")}
                </td>
                <td>
                    {shipyardShip.shipSymbol}
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