import { useState, useEffect, useContext } from "react";
import { fetchFleet } from "../../Api/ApiHandlingFleet"
import { fetchAllWaypoints } from "../../Api/ApiHandlingWaypoint"
import { AgentTokenContext } from "../../GlobalContext";
import { WaypointProfile, FleetShip } from "../Classes";
import { sendShipTo } from "../../Api/ApiHandlingNavigation";
import { PageViewContext } from "../../GlobalContext";

export default function Navigation() {
    const [shipData, setShipData] = useState([new FleetShip]); //list of the player's ships
    const [waypointDetails, setWaypointDetails] = useState([new WaypointProfile]); //list of waypoints in local area
    const [currentShip, setCurrentShip] = useState("");
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    // Fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleet(agentToken, setShipData);
    }, [agentToken, setShipData]);

    // Fetch information about the player's Waypoints from the api
    useEffect(() => {
        const shipLocations = shipData.map((ship: FleetShip) => ship.nav.systemSymbol);
        fetchAllWaypoints({ agentToken, shipLocations, setWaypointDetails });
    }, [agentToken, shipData, setWaypointDetails]);

    return (
        <>
            <h2>Local Waypoints</h2>
            <select name="shipSelector" id="shipSelector" onChange={(event) => setCurrentShip(event.target.value)}>
                    {shipData.map((ship: FleetShip) => <option key={ship.symbol} id={ship.symbol} value={ship.symbol}>{ship.symbol}</option>)}
                </select>
            <div id="waypointDetails">
                {waypointDetails &&
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Type
                                </th>
                                <th>
                                    Location
                                </th>
                                <th>
                                    Faction
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Traits
                                </th>
                                <th>
                                    Send ship
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {waypointDetails.map((waypoint: WaypointProfile) => <WaypointDetails key={waypoint.symbol} waypoint={waypoint} currentShip={currentShip} />)}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

// function to render Waypoints in table
function WaypointDetails({ waypoint, currentShip }: { waypoint: WaypointProfile, currentShip:string }) {
    const setCurrentView = useContext(PageViewContext)[1]; // import page state from context
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context
    
    return (
        <tr>
            <td className="noWrap">
                {waypoint.symbol}
            </td>
            <td>
                {waypoint.type.replace(/_/g," ")}
            </td>
            <td>
                {waypoint.x}, {waypoint.y}
            </td>
            <td>
                {waypoint.faction.symbol}
            </td>
            <td>
                {waypoint.isUnderConstruction ? <span>Under Construction</span> : <span>Active</span>}
            </td>
            <td>
                <div>{waypoint.traits.map(trait => <span key={trait.symbol}> {trait.symbol.replace(/_/g," ")};</span>)}</div>
            </td>
            <td>
            <input type="button" className="fullWidthButton" value="Send Ship" onClick={() => sendShipTo(agentToken, currentShip, waypoint.symbol, setCurrentView)} />
            </td>
        </tr>

    )

}