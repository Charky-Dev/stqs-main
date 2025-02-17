import { useState, useEffect, useContext } from "react";
import { fetchFleet, fetchShip } from "../Api/ApiHandlingFleet"
import { fetchWaypoint} from "../Api/ApiHandlingWaypoint"
import { fetchNewContract } from "../Api/ApiHandlingContract"
import { AgentTokenContext, PageViewContext } from "../globalContext";

export default function FleetManagement() {
    const [shipNames, setShipNames] = useState([""]); //list of the player's ships for quick reference
    const [currentShip, setCurrentShip] = useState("None"); //information about currently selected ship
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    // Fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleet(agentToken, setShipNames);
    }, [agentToken, setShipNames]);

    return (
        <>
            <h2>Fleet Management</h2>
            <div id="fleetList">
                {/* map all ships to buttons so player can choose to view more information */}
                {shipNames.map((ship) => <input key={ship} type="button" className={currentShip == ship ? "activeGenericButton" : "genericButton"} value={ship} onClick={() => setCurrentShip(ship)} />)}
            </div>
            <div id="shipOverview">
                {/* Fetch information about the currently selected ship */}
                {currentShip == String("None") ? null : <ShipDetails shipSymbol={String(currentShip)} />}
            </div>
        </>
    )

}

//Fetch and render details of a specified ship
export function ShipDetails({ shipSymbol }: { shipSymbol: string; }) {
    const [shipRegistration, setShipRegistration] = useState({ name: "", factionSymbol: "", role: "" });
    const [shipCooldown, setShipCooldown] = useState({ totalSeconds: 0, remainingSeconds: 0 });
    const [shipNav, setShipNav] = useState({ systemSymbol: "", waypointSymbol: "", route: "", status: "", flightMode: "" });
    const setCurrentView = useContext(PageViewContext)[1]; // import page state from context
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    useEffect(() => {
        fetchShip({ agentToken, shipSymbol, setShipRegistration, setShipCooldown, setShipNav });
    }, [agentToken, shipSymbol, setShipRegistration, setShipCooldown, setShipNav]);

    return (
        <>
            <div id="shipDetails">
                <h3>Ship Details:</h3>
                {shipRegistration && shipCooldown &&
                    <section>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Faction</th>
                                    <th>Role</th>
                                    <th>Cooldown Time</th>
                                    <th>Cooldown Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{shipRegistration.name}</td>
                                    <td>{shipRegistration.factionSymbol}</td>
                                    <td>{shipRegistration.role}</td>
                                    <td>{shipCooldown.totalSeconds}</td>
                                    <td>{shipCooldown.remainingSeconds}</td>
                                </tr>
                            </tbody>
                        </table>
                        { ["COMMAND", "SATELLITE"].includes(shipRegistration.role) ? null :
                        <input type="button" className="fullWidthButton"value="Negotiate New Contract" onClick={() => fetchNewContract(agentToken, shipRegistration.name, setCurrentView)}/>
                        }
                    </section>}
            </div>
            <WaypointDetails agentToken={agentToken} systemSymbol={shipNav.systemSymbol} waypointSymbol={shipNav.waypointSymbol} />

        </>
    )
}

// interface for data types in FetchAgentDetails
interface waypointPropTypes {
    agentToken: string;
    systemSymbol: string;
    waypointSymbol: string
}
//Fetch details about a given waypoint
export function WaypointDetails({ agentToken, systemSymbol, waypointSymbol }: waypointPropTypes) {
    const [waypointDetails, setWaypointDetails] = useState("");

    useEffect(() => {
        fetchWaypoint({ agentToken, systemSymbol, waypointSymbol, setWaypointDetails });
    }, [agentToken, systemSymbol, waypointSymbol, setWaypointDetails]);


    return (
        <div id="waypointData">
            <h3>Waypoint Data:</h3>
            <pre>{waypointDetails}</pre>

        </div>)
}